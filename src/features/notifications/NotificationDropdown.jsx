import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import NotificationList from './NotificationList';
import NotificationsBell from '../../ui/NotificationsBell.jsx';
import { Link, useNavigate } from 'react-router-dom';
import ButtonIcon from '../../ui/ButtonIcon.jsx';
import { useNotificationInbox } from './useNotificationInbox.js';
import normalizeNotifcationData from '../../utils/normalizeNotifcationData.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';
import useMarkAllNotificationsAsRead from './useMarkAllNotificationsAsRead.js';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const NotificationPanel = styled.div`
  position: absolute;
  top: calc(100% + 0.9rem);
  right: 0;
  width: 300px;
  max-height: 70vh;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
`;

const Title = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const MarkAllButton = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
`;

const Footer = styled.div`
  text-align: center;
  position: sticky;
  bottom: 0;
  background-color: var(--color-grey-50);
  padding: 1rem;
  border-top: 1px solid var(--color-grey-200);
`;

const ViewMoreLink = styled(Link)`
  color: var(--color-brand-600);
  font-weight: 500;
  font-size: 1.4rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: var(--color-brand-700);
  }
`;

function NotificationDropdown() {
  const { inbox, isPending } = useNotificationInbox();
  const { markAllAsRead } = useMarkAllNotificationsAsRead();
  const navigate = useNavigate();

  const inboxNotifications = inbox
    ?.filter((data) => !data.is_read)
    .map((data) => normalizeNotifcationData(data));

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggle = () => setIsOpen((o) => !o);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  function handleClick() {
    setIsOpen(false);
    markAllAsRead();
  }

  function handleNavigation() {
    setIsOpen(false);
    navigate('/profile/inbox');
  }

  if (isPending) return <SpinnerMini />;

  return (
    <DropdownWrapper ref={wrapperRef}>
      <DropdownTrigger onClick={toggle}>
        <ButtonIcon>
          <NotificationsBell />
        </ButtonIcon>
      </DropdownTrigger>

      {isOpen && (
        <NotificationPanel>
          <Header>
            <Title>Inbox</Title>

            <MarkAllButton
              disabled={!inboxNotifications?.length}
              onClick={handleClick}
            >
              Mark all
            </MarkAllButton>
          </Header>
          <ListContainer>
            <NotificationList
              inboxNotifications={inboxNotifications}
              onClose={setIsOpen}
              variant='dropdown'
              markOnClick
            />
          </ListContainer>
          <Footer>
            <ViewMoreLink to='/profile/inbox' onClick={handleNavigation}>
              View all notifications
            </ViewMoreLink>
          </Footer>
        </NotificationPanel>
      )}
    </DropdownWrapper>
  );
}

export default NotificationDropdown;
