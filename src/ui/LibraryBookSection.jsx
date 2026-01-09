import styled from 'styled-components';
import useGetLibraryBooks from '../features/profile/library/useGetLibraryBooks';
import Spinner from './Spinner';
import { useContinueReading } from '../hooks/useContinueReading';
import LibraryBookSectionSkeleton from './skeletons/LibraryBookSectionSkeleton';

const StyledBookSection = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.4rem;
`;

function LibraryBookSection({ ItemComponent, status, tab }) {
  const { library, isPending } = useGetLibraryBooks();
  const { continueReading } = useContinueReading();

  if (isPending) return <LibraryBookSectionSkeleton />;

  const libraryBooks = library.map((data) => ({
    ...data.books,
    ...data.chapters,
    status: data.status,
    lastReadChapterId: data.last_read_chapter_id,
    lastUpdated: data.updated_at,
  }));

  console.log(libraryBooks);

  function getBooksForTab({ libraryBooks, status, tab }) {
    if (tab === 'library') {
      return status
        ? libraryBooks.filter((book) => book.status === status)
        : libraryBooks;
    }

    if (tab === 'updates') {
      return libraryBooks
        .filter((book) => book.latest_chapter_at)
        .sort(
          (a, b) =>
            new Date(b.latest_chapter_at) - new Date(a.latest_chapter_at)
        );
    }

    if (tab === 'history') {
      return !status
        ? libraryBooks
            .filter((book) => book.lastReadChapterId)
            .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        : libraryBooks;
    }
    return libraryBooks;
  }

  const filteredBooks = getBooksForTab({ libraryBooks, status, tab });

  console.log(filteredBooks);
  return (
    <StyledBookSection>
      {filteredBooks.map((book) => (
        <ItemComponent key={book.id} book={book} onContinue={continueReading} />
      ))}
    </StyledBookSection>
  );
}

export default LibraryBookSection;
