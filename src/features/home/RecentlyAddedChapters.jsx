import { useBookNavigation } from '../../hooks/useBookNavigation';
import BookSection from '../../ui/BookSection';
import RecentlyAddedChaptersItem from '../../ui/RecentlyAddedChaptersItem';
import Spinner from '../../ui/Spinner';
import { useBooksByFilter } from '../books/useBooksByFilter';

function RecentlyAddedChapters() {
  const {
    books: ongoingBooks = [],
    isPending,
    error,
  } = useBooksByFilter({
    orderBy: 'updates',
    limit: 12,
  });
  const { goToBook } = useBookNavigation();
  if (error) {
    return <div>Error loading books: {error.message}</div>;
  }
  if (isPending) return <Spinner />;
  return (
    <BookSection
      ItemComponent={RecentlyAddedChaptersItem}
      heading='Recently Added Chapters'
      gridCols='3'
      to='/browse'
      display='flex'
      justify='space-between'
      books={ongoingBooks}
      onBookClick={goToBook}
    />
  );
}

export default RecentlyAddedChapters;
