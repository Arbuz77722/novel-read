import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledReviewCard = styled.div`
  padding: 2.5rem;
  border-radius: 12px;
  background-color: var(--color-grey-100);
  width: 100%;
  margin-bottom: 2rem;
  border: 1px solid var(--color-grey-200);
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const LeftRow = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;
`;

const AvatarSkeleton = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const UserInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
`;

const UserReviewSkeleton = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const UserReactionSkeleton = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const ReactionBoxSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.3rem 0.7rem;
`;

function ReviewCardItemSkeleton() {
  return (
    <StyledReviewCard>
      <UserProfile>
        <LeftRow>
          <AvatarSkeleton>
            <Skeleton circle width={50} height={50} />
          </AvatarSkeleton>
          <UserInfoSkeleton>
            <Skeleton width={120} height={20} />
            <Skeleton width={80} height={16} />
            <Skeleton width={150} height={16} />
          </UserInfoSkeleton>
        </LeftRow>
        <Skeleton width={120} height={24} />
      </UserProfile>

      <UserReviewSkeleton>
        <Skeleton count={5} height={18} />
      </UserReviewSkeleton>

      <UserReactionSkeleton>
        <ReactionBoxSkeleton>
          <Skeleton circle width={20} height={20} />
          <Skeleton width={40} height={16} />
        </ReactionBoxSkeleton>
        <ReactionBoxSkeleton>
          <Skeleton circle width={20} height={20} />
          <Skeleton width={40} height={16} />
        </ReactionBoxSkeleton>
      </UserReactionSkeleton>
    </StyledReviewCard>
  );
}

export default ReviewCardItemSkeleton;
