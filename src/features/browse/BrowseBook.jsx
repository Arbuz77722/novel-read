import { useBooks } from '../books/useBooks';
import BookSection from '../../ui/BookSection';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import Spinner from '../../ui/Spinner';
import NoBooksFound from '../../ui/NoBooksFound';
import { BookCard } from '../../ui/BookCard';

function BrowseBook() {
  const { books, isBookLoading } = useBooks();
  const { goToBook } = useBookNavigation();

  if (isBookLoading) return <Spinner />;
  if (!books?.length) return <NoBooksFound />;

  return (
    <>
      <BookSection
        ItemComponent={BookCard}
        heading='Explore newly published and popular novels across all categories'
        display='flex'
        justify='space-between'
        books={books}
        onBookClick={goToBook}
      />
    </>
  );
}

export default BrowseBook;
