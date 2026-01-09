import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const ReviewsContainer = styled.div`
  padding: 2rem;
  margin: 2rem 0;
`;

const TopRow = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const RightColumn = styled.div`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const HeaderTitleSkeleton = styled.div`
  margin-bottom: 1.5rem;
`;

const CharacteristicsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CharacteristicRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const RatingDistributionSkeleton = styled.div`
  height: 120px;
  margin-bottom: 2rem;
`;

const WriteReviewSectionSkeleton = styled.div`
  text-align: right;
  padding: 1rem;
`;

const MoreReviewsLinkSkeleton = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

function ReviewsSectionSkeleton() {
  return (
    <ReviewsContainer>
      <TopRow>
        <LeftColumn>
          <HeaderTitleSkeleton>
            <Skeleton width={200} height={32} />
          </HeaderTitleSkeleton>

          <CharacteristicsColumn>
            {Array(3)
              .fill()
              .map((_, i) => (
                <CharacteristicRow key={i}>
                  <Skeleton width={140} height={18} />
                  <Skeleton width={120} height={24} />
                </CharacteristicRow>
              ))}
          </CharacteristicsColumn>

          <RatingDistributionSkeleton>
            <Skeleton height={120} />
          </RatingDistributionSkeleton>
        </LeftColumn>

        <RightColumn>
          <WriteReviewSectionSkeleton>
            <Skeleton width={180} height={20} />
            <Skeleton width={140} height={48} borderRadius={8} />
          </WriteReviewSectionSkeleton>
        </RightColumn>
      </TopRow>

      <MoreReviewsLinkSkeleton>
        <Skeleton width={120} height={20} />
      </MoreReviewsLinkSkeleton>
    </ReviewsContainer>
  );
}

export default ReviewsSectionSkeleton;
