import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import ReviewCardItemSkeleton from './ReviewCardItemSkeleton';

const StyledReviewList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const HeaderSkeleton = styled.div`
  margin-bottom: 1rem;
`;

function ReviewsListSkeleton() {
  return (
    <StyledReviewList>
      <HeaderSkeleton>
        <Skeleton width={200} height={32} />
      </HeaderSkeleton>

      {/* Show 3-5 skeleton cards */}
      {Array(4)
        .fill()
        .map((_, i) => (
          <ReviewCardItemSkeleton key={i} />
        ))}
    </StyledReviewList>
  );
}

export default ReviewsListSkeleton;
