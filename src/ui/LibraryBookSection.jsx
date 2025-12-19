import styled from 'styled-components';
import useGetLibraryBooks from '../features/profile/library/useGetLibraryBooks';
import Spinner from './Spinner';
import { useContinueReading } from '../hooks/useContinueReading';

const StyledBookSection = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
`;

function LibraryBookSection({ ItemComponent, status }) {
  const { library, isPending } = useGetLibraryBooks();
  const { continueReading } = useContinueReading();

  if (isPending) return <Spinner />;

  const libraryBooks = library.map((data) => ({
    ...data.books,
    ...data.chapters,
    status: data.status,
    lastReadChapterId: data.last_read_chapter_id,
    lastUpdated: data.updated_at,
  }));
  console.log(libraryBooks);
  const filteredBooks = status
    ? libraryBooks.filter((book) => book.status === status)
    : libraryBooks;

  return (
    <StyledBookSection>
      {filteredBooks.map((book) => (
        <ItemComponent key={book.id} book={book} onContinue={continueReading} />
      ))}
    </StyledBookSection>
  );
}

export default LibraryBookSection;
