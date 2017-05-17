import IconSearch from 'icons/search';

class Component extends React.Component {
  render() {
    return (
      <div>
        {/* in JSXExpressionContainer */}
        <Foo icon={<IconSearch />} />
      </div>
    );
  }
}
