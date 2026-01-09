import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledSkeletonItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ImageSkeleton = styled.div`
  width: 40px;
  height: 50px;
  flex-shrink: 0;
`;

const ContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function RankingBookItemSkeleton() {
  return (
    <StyledSkeletonItem>
      <ImageSkeleton>
        <Skeleton height='100%' width='100%' borderRadius={4} />
      </ImageSkeleton>
      <ContentSkeleton>
        <Skeleton width='70%' height={18} />
        <StatsRow>
          <Skeleton circle width={16} height={16} />
          <Skeleton width={80} height={14} />
        </StatsRow>
        <StatsRow>
          <Skeleton circle width={16} height={16} />
          <Skeleton width={100} height={14} />
        </StatsRow>
      </ContentSkeleton>
    </StyledSkeletonItem>
  );
}

export default RankingBookItemSkeleton;
