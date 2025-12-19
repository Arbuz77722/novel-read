import BookSection from '../../ui/BookSection';
import { useBooksByFilter } from '../books/useBooksByFilter';
import { BookCard } from '../../ui/BookCard';
import { useBookNavigation } from '../../hooks/useBookNavigation';

// function CompletedBooks() {
//   const { books: completedBooks } = useBooksByFilter({
//     status: 'completed',
//     limit: 12,
//   });

//   const { goToBook } = useNavigation();

//   return (
//     <BookSection
//       ItemComponent={CompletedBooksItem}
//       heading='Completed Books'
//       to='/browse?genre=all&status=completed'
//       display='flex'
//       justify='space-between'
//       books={completedBooks}
//       onItemClick={goToBook}
//     />
//   );
// }

export function CompletedBooks() {
  const { books: completedBooks = [] } = useBooksByFilter({
    status: 'completed',
    limit: 12,
  });
  const { goToBook } = useBookNavigation();

  if (!completedBooks?.length) return null;

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
