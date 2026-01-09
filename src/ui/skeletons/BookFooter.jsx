import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const MarginBottom = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const PaginationSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

function BookFooterSkeleton() {
  return (
    <MarginBottom>
      <PaginationSkeleton>
        <Skeleton width={40} height={40} circle />
        {Array(7)
          .fill()
          .map((_, i) => (
            <Skeleton key={i} width={40} height={40} borderRadius={8} />
          ))}
        <Skeleton width={40} height={40} circle />
      </PaginationSkeleton>
    </MarginBottom>
  );
}

export default BookFooterSkeleton;
