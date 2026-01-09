import { useBookNavigation } from '../../hooks/useBookNavigation';
import BookSection from '../../ui/BookSection';
import RecentlyAddedChaptersItem from '../../ui/RecentlyAddedChaptersItem';
import BookCardSkeleton from '../../ui/skeletons/BookCardSkeleton';
import Spinner from '../../ui/Spinner';
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
        books={Array(12).fill({})} // Fake array to render 12 skeletons
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
      books={ongoingBooks}
      onBookClick={goToBook}
    />
  );
}

export default RecentlyAddedChapters;
