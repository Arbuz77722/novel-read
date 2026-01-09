import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledReviewHeader = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

const CoverSkeleton = styled.div`
  width: 12rem;
  height: 15rem;
  border-radius: 8px;
  overflow: hidden;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TopRowSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BottomRowSkeleton = styled.div`
  margin-top: 2rem;
`;

function ReviewHeaderSkeleton() {
  return (
    <StyledReviewHeader>
      <LeftColumn>
        <CoverSkeleton>
          <Skeleton height='100%' />
        </CoverSkeleton>
      </LeftColumn>
      <RightColumn>
        <TopRowSkeleton>
          <Skeleton width='70%' height={36} />
          <Skeleton width='40%' height={24} />
        </TopRowSkeleton>
        <BottomRowSkeleton>
          <Skeleton width={150} height={30} />
        </BottomRowSkeleton>
      </RightColumn>
    </StyledReviewHeader>
  );
}

export default ReviewHeaderSkeleton;
