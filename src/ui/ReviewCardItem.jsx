import styled from 'styled-components';
import StarRating from './StarRating';
import ExpandableText from './ExpandableText';
import { HiThumbDown, HiThumbUp } from 'react-icons/hi';
import { useVote } from '../features/reviews/voteOnReview';
import { useState } from 'react';
import { displayRole } from '../utils/displayRole';

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
`;

const LeftRow = styled.div`
  display: flex;
  gap: 1.8rem;
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
  gap: 0.7rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

const UserTag = styled.div`
  padding: 0.4rem 0.8rem;
  background-color: var(--color-grey-200);
  color: var(--color-brand-500);
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ReviewDate = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const UserReview = styled.div`
  width: 100%;
  font-size: 1.7;
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
  margin-top: 2rem;
  padding: 0.3rem 0.7rem;
  background-color: var(--color-grey-200);
  border-radius: 11px;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconWrapper = styled.span`
  display: flex;
  cursor: pointer;
  transform: ${({ active }) => (active ? 'scale(1.2)' : 'scale(1)')};
  transition: transform 0.15s ease, color 0.15s ease;
  color: ${({ active }) =>
    active ? 'var(--color-brand-700)' : 'var(--color-grey-700)'};
`;

function ReviewCardItem({ review }) {
  const {
    id,
    upvotes,
    downvotes,
    myVote,
    profiles: { username, avatar_url, role },
    rating,
    created_at,
    review: text,
  } = review;

  const voteMutation = useVote();

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
    <StyledReviewCard id={`review-${id}`}>
      <UserProfile>
        <LeftRow>
          <Avatar src={avatar_url || '/placeholder-avatar.jpg'} />
          <ReviewUser>
            <UserInfo>
              <UserName>{username}</UserName>
              <UserTag>{displayRole(role)}</UserTag>
            </UserInfo>
            <ReviewDate>
              {new Date(created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </ReviewDate>
          </ReviewUser>
        </LeftRow>

        <StarRating size={22} interactive={false} rating={rating} />
      </UserProfile>

      <UserReview>
        <ExpandableText text={text} charLimit={500} />
      </UserReview>

      <UserReaction>
        <ReactionBox onClick={() => handleVote(1)}>
          <IconWrapper active={localVote === 1}>
            <HiThumbUp size={16} />
          </IconWrapper>
          <span>{localUp}</span>
        </ReactionBox>

        <ReactionBox onClick={() => handleVote(-1)}>
          <IconWrapper active={localVote === -1}>
            <HiThumbDown size={16} />
          </IconWrapper>
          <span>{localDown}</span>
        </ReactionBox>
      </UserReaction>
    </StyledReviewCard>
  );
}

export default ReviewCardItem;
