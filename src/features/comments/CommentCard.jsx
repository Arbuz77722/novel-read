import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ExpandableText from '../../ui/ExpandableText';
import { HiReply, HiThumbDown, HiThumbUp } from 'react-icons/hi';
import { useCommentVote } from './useCommentVote';
import { displayRole } from '../../utils/displayRole';

const Card = styled.div`
  padding: 2.5rem;
  border-radius: 12px;
  background-color: ${({ variant }) =>
    variant === 'reply' ? 'var(--color-grey-50)' : 'var(--color-grey-100)'};
  border: 1px solid var(--color-grey-200);
  border-left: ${({ variant }) =>
    variant === 'reply' ? '3px solid var(--color-brand-500)' : 'none'};
  margin-top: 1.6rem;
`;

const Header = styled.div`
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
  height: ${({ variant }) => (variant === 'reply' ? '3.8rem' : '5rem')};
  width: ${({ variant }) => (variant === 'reply' ? '3.8rem' : '5rem')};
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const NameRow = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

const Username = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

const RoleTag = styled.span`
  padding: 0.4rem 0.8rem;
  background-color: var(--color-grey-200);
  color: var(--color-brand-500);
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const DateText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Body = styled.div`
  width: 100%;
  font-size: 1.7;
  margin-top: 2rem;
  line-height: 1.8;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;

const ReactionGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
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
  transition:
    transform 0.15s ease,
    color 0.15s ease;
  color: ${({ active }) =>
    active ? 'var(--color-brand-700)' : 'var(--color-grey-700)'};
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-700);
`;

function CommentCard({
  comment,
  onReply,
  variant = 'root',
  targetId,
  targetType,
}) {
  const {
    id,
    comment: text,
    created_at,
    profiles: { avatar_url, username, role },
    myVote = 0,
    upvotes = 0,
    downvotes = 0,
  } = comment;

  const voteMutation = useCommentVote({ targetId, targetType });

  const [localVote, setLocalVote] = useState(myVote);
  const [localUp, setLocalUp] = useState(upvotes);
  const [localDown, setLocalDown] = useState(downvotes);

  useEffect(() => {
    setLocalVote(myVote);
    setLocalUp(upvotes);
    setLocalDown(downvotes);
  }, [myVote, upvotes, downvotes]);

  const handleVote = (vote) => {
    if (voteMutation.isPending) return;
    const newVote = localVote === vote ? 0 : vote;
    if (localVote === 1) setLocalUp((n) => n - 1);
    if (localVote === -1) setLocalDown((n) => n - 1);
    if (newVote === 1) setLocalUp((n) => n + 1);
    if (newVote === -1) setLocalDown((n) => n + 1);

    setLocalVote(newVote);
    voteMutation.mutate({ commentId: id, vote: newVote });
  };

  return (
    <Card variant={variant}>
      <Header>
        <LeftRow>
          <Avatar
            variant={variant}
            src={avatar_url || '/placeholder-avatar.jpg'}
            alt={username}
          />

          <UserInfo>
            <NameRow>
              <Username>{username}</Username>
              <RoleTag>{displayRole(role)}</RoleTag>
            </NameRow>
            <DateText>
              {' '}
              {new Date(created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </DateText>
          </UserInfo>
        </LeftRow>
      </Header>

      <Body>
        <ExpandableText text={text} charLimit={450} />
      </Body>

      <Actions>
        <ReactionGroup>
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
        </ReactionGroup>

        <ReactionBox onClick={onReply}>
          <IconWrapper>
            <HiReply size={16} />
          </IconWrapper>
          <ReplyButton>Reply</ReplyButton>
        </ReactionBox>
      </Actions>
    </Card>
  );
}

export default CommentCard;
