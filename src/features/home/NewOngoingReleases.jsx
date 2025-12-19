import { useBookNavigation } from '../../hooks/useBookNavigation';
import { BookCard } from '../../ui/BookCard';
import BookSection from '../../ui/BookSection';
import { useBooksByFilter } from '../books/useBooksByFilter';

function NewOngoingReleases() {
  const { books: ongoingBooks } = useBooksByFilter({
    orderBy: 'new',
    limit: 12,
  });

  const { goToBook } = useBookNavigation();

  return (
    <BookSection
      ItemComponent={BookCard}
      heading='New Ongoing Releases'
      to='/browse'
      display='flex'
      justify='space-between'
      books={ongoingBooks}
      onBookClick={goToBook}
    />
  );
}

export default NewOngoingReleases;
