import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledFilter = styled.div`
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ReviewStatsSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const FilterButtonsSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

function ReviewFilterSkeleton() {
  return (
    <StyledFilter>
      <ReviewStatsSkeleton>
        <Skeleton width={150} height={32} />
        <Skeleton width={80} height={32} />
      </ReviewStatsSkeleton>

      <FilterButtonsSkeleton>
        {Array(4)
          .fill()
          .map((_, i) => (
            <Skeleton key={i} width={120} height={40} borderRadius={8} />
          ))}
      </FilterButtonsSkeleton>
    </StyledFilter>
  );
}

export default ReviewFilterSkeleton;
