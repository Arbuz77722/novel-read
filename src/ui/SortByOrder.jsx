import FilterSection from './FilterSection';

function SortByOrder({ active, onChange, showHeading }) {
  return (
    <FilterSection
      title='Order By'
      options={['New', 'Popular', 'Updates']}
      activeOption={active}
      onSelect={onChange}
      showHeading={showHeading}
    />
  );
}

export default SortByOrder;
