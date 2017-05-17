const fs = require('fs');
const path = require('path');
const plugin = require('../');
const pluginTester = require('babel-plugin-tester');

const fixtures = fs.readdirSync(path.resolve(path.join(__dirname, 'fixtures'))) || [];

pluginTester({
  pluginName: 'Stateless to Functions',
  plugin: [ plugin, { modulePathWhitelist: [ '^icons\/', 'foobar' ] } ],
  babelOptions: JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, '../.babelrc')))),
  fixtures: path.resolve(path.join(__dirname, 'fixtures')),
  snapshot: true,
  tests: fixtures.map((fixture) => ({
    title: path.basename(fixture, '.js').replace('-', ' '),
    fixture
  }))
});
