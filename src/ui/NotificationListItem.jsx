import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useGetSlugById from '../features/books/useGetSlugById';
import useMarkNotificationAsRead from '../features/notifications/useMarkNotificationAsRead';
import getNotificationRoute from '../utils/getNotificationRoute';
import { NotificationLabel } from '../utils/NotificationLabels';
import { timeAgo } from '../utils/timeAgo';
import { useChapter } from '../features/chapters/useChapter';

const StyledListItem = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  width: 100%;
  cursor: pointer;

  padding: ${({ $variant }) => ($variant === 'dropdown' ? '1.6rem' : '2.4rem')};

  ${({ $variant }) =>
    $variant === 'page'
      ? `
        max-width: 720px;
        margin: 0 auto 1.6rem auto;
        background-color: var(--color-grey-0);
        border-radius: 12px;
        border: 1px solid var(--color-grey-200);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        transition: box-shadow 0.2s ease, transform 0.15s ease;

        &:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
      `
      : `
        border-bottom: 1px solid var(--color-grey-200);

        &:hover {
          background-color: var(--color-grey-50);
        }
      `}
`;

const Avatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: var(--color-grey-200);
`;

const Content = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const Message = styled.p`
  margin: 0 0 0.4rem 0;
  font-size: 1.5rem;
  color: var(--color-brand-700);
  line-height: 1.5;
`;
const Timestamp = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  margin-top: 0.2rem;
  display: block;
`;

const Snippet = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  margin: 0.2rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem;
  border-radius: 5px;
  background-color: #1c2c453d;
`;

function NotificationListItem({ inbox, onClose, markOnClick, variant }) {
  const {
    notificationType,
    notifcationId,
    actorAvatar,
    actorName,
    bookId,
    isRead,
    commentId,
    reviewId,
    parentCommentId,
    time,
    commentText,
    reviewText,
    chapterId,
  } = inbox;
  const navigate = useNavigate();
  const { markAsRead } = useMarkNotificationAsRead();
  const { slug, title } = useGetSlugById(bookId);
  const chapters = useChapter(bookId, chapterId);
  const label = NotificationLabel({
    chapterTitle: chapters?.data?.title,
    chapterNumber: chapters?.data?.number,
    bookTitle: title,
    notificationType,
    actorName,
    title,
  });

  function handleClick() {
    if (onClose) onClose(false);

    if (markOnClick && !isRead) {
      markAsRead(notifcationId);
    }

    const route = getNotificationRoute({
      commentId,
      reviewId,
      slug,
      parentCommentId,
      chapterId,
    });

    navigate(route.pathname, { state: route.state });
  }

  return (
    <StyledListItem $variant={variant} onClick={handleClick}>
      <Avatar
        src={actorAvatar || '/placeholder-avatar.jpg'}
        alt={actorName || 'User'}
      />
      <Content>
        <Message>{label}</Message>
        {commentText && <Snippet>{commentText}</Snippet>}
        {reviewText && <Snippet>{reviewText}</Snippet>}
        <Timestamp>{timeAgo(time)}</Timestamp>
      </Content>
    </StyledListItem>
  );
}

export default NotificationListItem;
