import { useBookNavigation } from '../../hooks/useBookNavigation';
import { BookCard } from '../../ui/BookCard';
import BookSection from '../../ui/BookSection';
import BookCardSkeleton from '../../ui/skeletons/BookCardSkeleton';
import { useBooksByFilter } from '../books/useBooksByFilter';

function NewOngoingReleases() {
  const { books: ongoingBooks, isPending } = useBooksByFilter({
    orderBy: 'new',
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
      ItemComponent={BookCard}
      heading='New Ongoing Releases'
      to='/browse'
      books={ongoingBooks}
      onBookClick={goToBook}
      variant='ongoing'
    />
  );
}

export default NewOngoingReleases;
