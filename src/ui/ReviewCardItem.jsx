import styled from 'styled-components';
import StarRating from './StarRating';
import ExpandableText from './ExpandableText';
import { HiThumbDown, HiThumbUp } from 'react-icons/hi';
import { useVote } from '../features/reviews/voteOnReview';
import { useState } from 'react';

const StyledReviewCard = styled.div`
  padding: 2.5rem;
  border-radius: 12px;
  background-color: var(--color-grey-100);
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftRow = styled.div`
  display: flex;
  gap: 1.8rem;
  align-items: center;
`;

const RightRow = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ReviewUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const UserName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

const UserTag = styled.div`
  padding: 0.2rem 0.5rem;
  background-color: var(--color-brand-700);
  border-radius: 5px;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ReviewDate = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

const UserReview = styled.div`
  width: 100%;
  font-size: 1.4rem;
  margin-top: 2rem;
  line-height: 1.8;
`;

const UserReaction = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  gap: 2rem;
`;

const ReactionBox = styled.span`
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-200);
  border-radius: 11px;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
const ReactionIcon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.span`
  display: flex;
  cursor: pointer;
  transform: ${({ active }) => (active ? 'scale(1.2)' : 'scale(1)')};
  transition: transform 0.15s ease, color 0.15s ease;
  color: ${({ active }) =>
    active ? 'var(--color-brand-700)' : 'var(--color-grey-700)'};
`;
const Counter = styled.span``;

function ReviewCardItem({ review }) {
  const {
    id,
    upvotes,
    downvotes,
    myVote,
    profiles: { username, avatar_url },
    rating,
    created_at,
  } = review;

  const voteMutation = useVote();

  // Local optimistic UI values
  const [localVote, setLocalVote] = useState(myVote);
  const [localUp, setLocalUp] = useState(upvotes);
  const [localDown, setLocalDown] = useState(downvotes);

  const handleVote = (vote) => {
    const newVote = localVote === vote ? null : vote;

    if (localVote === 1) setLocalUp((n) => n - 1);
    if (localVote === -1) setLocalDown((n) => n - 1);

    if (newVote === 1) setLocalUp((n) => n + 1);
    if (newVote === -1) setLocalDown((n) => n + 1);

    setLocalVote(newVote);

    voteMutation.mutate({ reviewId: id, vote: newVote });
  };

  return (
    <StyledReviewCard>
      <UserProfile>
        <LeftRow>
          <Avatar
            src={avatar_url || '/placeholder-avatar.jpg'}
            alt='Reviewer avatar'
          />

          <ReviewUser>
            <UserInfo>
              <UserName>{username}</UserName>
              <UserTag>Reader</UserTag>
            </UserInfo>

            <ReviewDate>{new Date(created_at).toLocaleDateString()}</ReviewDate>
          </ReviewUser>
        </LeftRow>

        <RightRow>
          <StarRating size={22} interactive={false} rating={rating} />
        </RightRow>
      </UserProfile>

      <UserReview>
        <ExpandableText text={review.review} charLimit={500} />
      </UserReview>

      <UserReaction>
        <ReactionBox>
          <ReactionIcon>
            <IconWrapper active={localVote === 1} onClick={() => handleVote(1)}>
              <HiThumbUp size={22} />
            </IconWrapper>
          </ReactionIcon>
          <Counter>{localUp}</Counter>
        </ReactionBox>

        <ReactionBox>
          <ReactionIcon>
            <IconWrapper
              active={localVote === -1}
              onClick={() => handleVote(-1)}
            >
              <HiThumbDown size={22} />
            </IconWrapper>
          </ReactionIcon>
          <Counter>{localDown}</Counter>
        </ReactionBox>
      </UserReaction>
    </StyledReviewCard>
  );
}

export default ReviewCardItem;
