import BookSection from '../../ui/BookSection';
import { useBooksByFilter } from '../books/useBooksByFilter';
import { BookCard } from '../../ui/BookCard';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import BookCardSkeleton from '../../ui/skeletons/BookCardSkeleton';

export function CompletedBooks() {
  const { books: completedBooks = [], isPending } = useBooksByFilter({
    status: 'completed',
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
      heading='Completed Books'
      books={completedBooks}
      ItemComponent={BookCard}
      onBookClick={goToBook}
      to='/browse?genre=all&status=completed'
    />
  );
}

export default CompletedBooks;
