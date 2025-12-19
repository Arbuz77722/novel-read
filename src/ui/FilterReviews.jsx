import FilterSection from './FilterSection';

function FilterReviews({ active, onChange, showHeading }) {
  return (
    <FilterSection
      title='Filter'
      options={['Most liked', 'Most disliked', 'Newest', 'Oldest']}
      activeOption={active}
      onSelect={onChange}
      showHeading={showHeading}
    />
  );
}

export default FilterReviews;
