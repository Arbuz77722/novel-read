import FilterSection from './FilterSection';

function FilterByStatus({ active, onChange, showHeading }) {
  return (
    <FilterSection
      title='Status'
      options={['All', 'Completed', 'Ongoing']}
      activeOption={active}
      onSelect={onChange}
      showHeading={showHeading}
    />
  );
}

export default FilterByStatus;
