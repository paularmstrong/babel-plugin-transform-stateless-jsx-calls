import IconSearch from 'icons/search';

function bar() {
  return (
    <div>{ foo ? (<Foo icon={<IconSearch foo={{ bar: true }} />} />) : null }</div>
  );
}
