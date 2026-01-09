import styled from 'styled-components';
import NotificationListItem from '../../ui/NotificationListItem';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  ${({ $variant }) =>
    $variant === 'dropdown' &&
    `
      align-items: center;
    `}
`;

const NoUnreadMessage = styled.span`
  margin-top: 2rem;
`;

function NotificationList({
  onClose,
  inboxNotifications,
  markOnClick,
  variant,
}) {
  return (
    <StyledList $variant={variant}>
      {inboxNotifications?.length === 0 ? (
        <NoUnreadMessage>No unread notifications</NoUnreadMessage>
      ) : (
        inboxNotifications?.map((i) => (
          <NotificationListItem
            key={i.notifcationId}
            inbox={i}
            onClose={onClose}
            markOnClick={markOnClick}
            variant={variant}
          />
        ))
      )}
    </StyledList>
  );
}

export default NotificationList;
