const testIsWhitelistedImport = (modulePathWhitelist, node) => {
  if (node && node.source && node.source.value) {
    const importWhitelist = modulePathWhitelist.map((path) => new RegExp(path));
    let i = importWhitelist.length;
    while (i--) {
      const whitelisted = importWhitelist[i];
      if (typeof whitelisted === 'object' && whitelisted.test(node.source.value)) {
        return true;
      } else if (whitelisted === node.source.value) {
        return true;
      }
    }
  }
  return false;
};

const getDefaultSpecifier = (node) => {
  if (node && node.specifiers) {
    let i = node.specifiers.length;
    while (i--) {
      const specifier = node.specifiers[i];
      if (specifier && specifier.type === 'ImportDefaultSpecifier') {
        return specifier;
      }
    }
  }
  return null;
};

const inEnvironment = (envWhitelist) => {
  if (!envWhitelist) {
    return true;
  }
  return envWhitelist.indexOf(process.env.BABEL_ENV) !== -1 || envWhitelist.indexOf(process.env.NODE_ENV) !== -1;
};

module.exports = function ({ types: t }) {
  const whitelistedIdentifiers = [];
  return {
    visitor: {
      // whitelist the identifiers imported from whitelisted modules
      ImportDeclaration(path, { opts: { envWhitelist, modulePathWhitelist } }) {
        if (!inEnvironment(envWhitelist)) {
          return;
        }

        if (testIsWhitelistedImport(modulePathWhitelist, path.node)) {
          const defaultSpecifier = getDefaultSpecifier(path.node);
          whitelistedIdentifiers.push(defaultSpecifier.local.name);
        }
      },

      JSXElement(path, { opts: { envWhitelist, modulePathWhitelist } }) {
        if (!inEnvironment(envWhitelist)) {
          return;
        }

        const { node: { openingElement }, parent } = path;

        const callee = openingElement.name.name;
        if (whitelistedIdentifiers.indexOf(callee) === -1) {
          // Do nothing if not a whitelisted import identifier
          return;
        }

        const props = openingElement.attributes;
        const args = props.reduce((args, prop) => {
          args.push(t.objectProperty(t.stringLiteral(prop.name.name), prop.value.expression || prop.value));
          return args;
        }, []);

        // Builds: Identifier({ ...args }) or Identifier()
        const callExpression = t.callExpression(
          t.identifier(callee), props.length ? [ t.objectExpression(args) ] : []
        );

        if (t.isJSXElement(parent)) {
          // Wraps the call expression as JSX: {Identifier({ ...args })}
          path.replaceWith(t.jSXExpressionContainer(callExpression));
        } else {
          path.replaceWith(callExpression);
        }
      }
    }
  };
};
