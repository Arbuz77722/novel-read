import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const TOCContainer = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
`;

const TOCHeader = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const TOCGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const TOCItemSkeleton = styled.div`
  height: 80px;
  border-radius: 8px;
  padding: 1rem;
`;

const PaginationSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

function TableOfContentsSkeleton() {
  return (
    <TOCContainer>
      <TOCHeader>
        <Skeleton width={200} height={32} />
      </TOCHeader>

      <TOCGrid>
        {Array(12)
          .fill()
          .map((_, i) => (
            <TOCItemSkeleton key={i}>
              <Skeleton height='100%' />
            </TOCItemSkeleton>
          ))}
      </TOCGrid>

      <PaginationSkeleton>
        <Skeleton width={40} height={40} circle />
        {Array(5)
          .fill()
          .map((_, i) => (
            <Skeleton key={i} width={36} height={36} borderRadius={6} />
          ))}
        <Skeleton width={40} height={40} circle />
      </PaginationSkeleton>
    </TOCContainer>
  );
}

export default TableOfContentsSkeleton;
