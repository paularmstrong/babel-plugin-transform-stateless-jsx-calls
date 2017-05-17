import IconSearch from 'icons/search';

class Component extends React.Component {
  render() {
    return (
      <div>
        {/* plain component */}
        <IconSearch styles={{foo: 'bar'}} className={classNames(styles.icon)} />
      </div>
    );
  }
}
