import styled from 'styled-components';
import SpinnerMini from '../../ui/SpinnerMini';
import normalizeNotifcationData from '../../utils/normalizeNotifcationData';
import NotificationList from '../notifications/NotificationList';
import useInfiniteNotifications from '../notifications/useInfiniteNotifications';

const StyledInbox = styled.div``;

const LoadMoreButton = styled.button`
  margin-top: 3rem;
  margin-left: auto;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: 999px;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  cursor: pointer;
  display: flex;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Title = styled.h2`
  color: var(--color-brand-600);
  border-bottom: 1px solid var(--color-grey-100);
  padding-bottom: 2rem;
  margin-bottom: 3rem;
`;

function ProfileInbox() {
  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteNotifications();

  if (isPending) return <SpinnerMini />;

  const inboxNotifications = notifications?.map((data) =>
    normalizeNotifcationData(data)
  );

  return (
    <StyledInbox>
      <Title>Inbox</Title>
      <NotificationList
        inboxNotifications={inboxNotifications}
        markOnClick={false}
        variant='page'
      />

      {hasNextPage && (
        <LoadMoreButton onClick={fetchNextPage} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </LoadMoreButton>
      )}
    </StyledInbox>
  );
}

export default ProfileInbox;
