import IconSearch from 'icons/search';

const foo = IconSearch({ className: 'icon' });
function bar() {
  return (
    <div>{IconSearch({ className: 'icon' })}</div>
  );
}
