import { useBookNavigation } from '../../hooks/useBookNavigation';
import BookSection from '../../ui/BookSection';
import RecentlyAddedChaptersItem from '../../ui/RecentlyAddedChaptersItem';
import BookCardSkeleton from '../../ui/skeletons/BookCardSkeleton';
import { useBooksByFilter } from '../books/useBooksByFilter';

function RecentlyAddedChapters() {
  const { books: ongoingBooks = [], isPending } = useBooksByFilter({
    orderBy: 'updates',
    limit: 12,
  });
  const { goToBook } = useBookNavigation();

  if (isPending) {
    return (
      <BookSection
        ItemComponent={BookCardSkeleton}
        heading='New Ongoing Releases'
        books={Array(12).fill({})}
        display='flex'
        justify='space-between'
      />
    );
  }

  return (
    <BookSection
      ItemComponent={RecentlyAddedChaptersItem}
      heading='Recently Added Chapters'
      gridCols='3'
      to='/browse'
      display='flex'
      justify='space-between'
      variant='updates'
      books={ongoingBooks}
      onBookClick={goToBook}
    />
  );
}

export default RecentlyAddedChapters;
