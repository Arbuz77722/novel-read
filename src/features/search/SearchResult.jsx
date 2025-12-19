import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner'; // your spinner component
import Pagination from '../../ui/Pagination'; // reuse your pagination component
import { useBookNavigation } from '../../hooks/useBookNavigation';
import { PAGE_SIZE } from '../../utils/constants';
import { useBooks } from '../books/useBooks';

const Wrapper = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const Cover = styled.img`
  width: 120px;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const Title = styled.span`
  font-size: 14px;
  text-align: center;
`;

const Empty = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { goToBook } = useBookNavigation();
  const { books, isBookLoading, count } = useBooks();

  if (isBookLoading) return <Spinner />;

  return (
    <Wrapper>
      <h2>
        Results for "<span>{query}</span>"
      </h2>

      {books.length === 0 && query.length >= 3 ? (
        <Empty>No results found.</Empty>
      ) : (
        <Grid>
          {books.map((book) => (
            <BookCard key={book.id} onClick={() => goToBook(book)}>
              <Cover
                src={book.cover_url || '/fallback-cover.png'}
                alt={book.title}
              />
              <Title>{book.title}</Title>
            </BookCard>
          ))}
        </Grid>
      )}

      {count > PAGE_SIZE && (
        <Pagination count={count} pageSize={PAGE_SIZE} currentPage={page} />
      )}
    </Wrapper>
  );
}
