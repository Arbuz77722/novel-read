import { useBooks } from '../features/books/useBooks';
import BrowseFilter from '../features/browse/BrowseFilter';
import Genre from '../features/browse/Genre';
import { useGenres } from '../features/browse/useGenres';
import useBrowseParams from '../hooks/useBrowseParams';
import BrowseBook from '../features/browse/BrowseBook';
import ResetButton from './FilterReset';
import Spinner from './Spinner';
import BookFooter from '../features/books/BookFooter';
import styled from 'styled-components';

function BrowseSections() {
  const { isGenreLoading } = useGenres();
  const { isBookLoading } = useBooks();
  const { hasActiveFilters } = useBrowseParams();

  if (isGenreLoading || isBookLoading) return <Spinner />;
  return (
    <div>
      <Genre />
      {hasActiveFilters && <ResetButton position top={10.5} right={24} />}
      <BrowseFilter />
      <BrowseBook />
      <BookFooter />
    </div>
  );
}

export default BrowseSections;
