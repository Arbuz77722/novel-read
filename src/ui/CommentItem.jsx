import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentCard from '../features/comments/CommentCard';
import useReplies from '../features/comments/useReplies';
import ReplyInput from '../features/comments/ReplyInput';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const Item = styled.li`
  list-style: none;
  margin-bottom: 2rem;
`;

const ActionsRow = styled.div`
  margin-top: 0.8rem;
`;

const ToggleReplies = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--color-brand-600);
  outline: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
    border-radius: 4px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const Replies = styled.ul`
  margin-top: 1.6rem;
  margin-left: 3.2rem;
  padding-left: 2rem;
  border-left: 2px solid var(--color-grey-300);
`;
const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
`;

export default function CommentItem({
  comment,
  targetId,
  targetType,
  depth = 0,
  expandCommentId,
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { replies = [] } = useReplies(showReplies ? comment.id : null);

  useEffect(() => {
    if (expandCommentId === comment.id) {
      setShowReplies(true);
    }
  }, [expandCommentId, comment.id]);

  useEffect(() => {
    if (!showReplies) return;
    if (!replies.length) return;

    const el = document.getElementById(`comment-${expandCommentId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showReplies, replies.length, expandCommentId]);

  return (
    <Item id={`comment-${comment.id}`}>
      <CommentCard
        comment={comment}
        variant={depth === 0 ? 'root' : 'reply'}
        onReply={() => setShowReplyInput((v) => !v)}
        targetId={targetId}
        targetType={targetType}
      />

      <ActionsRow>
        {comment.reply_count > 0 && (
          <ToggleReplies onClick={() => setShowReplies((v) => !v)}>
            {showReplies ? (
              <ArrowIcon>
                <HiChevronUp size={18} />
                Hide replies
              </ArrowIcon>
            ) : (
              <ArrowIcon>
                <HiChevronDown size={18} />
                {comment.reply_count}{' '}
                {comment.reply_count === 1 ? 'reply' : 'replies'}
              </ArrowIcon>
            )}
          </ToggleReplies>
        )}
      </ActionsRow>

      {showReplyInput && (
        <ReplyInput
          parentId={comment.id}
          targetId={targetId}
          targetType={targetType}
          onClose={() => setShowReplyInput(false)}
        />
      )}

      {showReplies && replies.length > 0 && (
        <Replies>
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              targetId={targetId}
              targetType={targetType}
              depth={depth + 1}
              expandCommentId={expandCommentId}
            />
          ))}
        </Replies>
      )}
    </Item>
  );
}
