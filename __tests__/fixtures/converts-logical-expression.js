import IconSearch from 'icons/search';

const foo = bar && <IconSearch className='icon' />;
function bar() {
  return (
    <div>{isSelected && <IconSearch />}</div>
  );
}
