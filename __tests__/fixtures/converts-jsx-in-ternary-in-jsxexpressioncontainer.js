import IconSearch from 'icons/search';

class Component extends React.Component {
  render() {
    return (
      <div>
        {/* in JSX in ternary in JSXExpressionContainer */}
        <Foo children={bar ? (<div><IconSearch /></div>) : null} />
      </div>
    );
  }
}
