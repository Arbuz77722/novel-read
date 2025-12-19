import Pagination from '../../ui/Pagination';
import { useBooks } from './useBooks';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import styled from 'styled-components';

const MarginBottom = styled.div`
  margin-bottom: 2rem;
`;
function BookFooter() {
  const { isBookLoading, count } = useBooks();
  if (isBookLoading) return <Spinner />;

  return (
    <MarginBottom>
      <Pagination count={count} mode='number' PAGE_SIZE={18} />
    </MarginBottom>
  );
}

export default BookFooter;
