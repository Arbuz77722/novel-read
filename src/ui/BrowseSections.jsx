import BrowseFilter from '../features/browse/BrowseFilter';
import Genre from '../features/browse/Genre';
import useBrowseParams from '../hooks/useBrowseParams';
import BrowseBook from '../features/browse/BrowseBook';
import ResetButton from './FilterReset';
import BookFooter from '../features/books/BookFooter';

function BrowseSections() {
  const { hasActiveFilters } = useBrowseParams();

  return (
    <div>
      <Genre />
      {hasActiveFilters && <ResetButton position top={15} right={24} />}
      <BrowseFilter />
      <BrowseBook />
      <BookFooter />
    </div>
  );
}

export default BrowseSections;
