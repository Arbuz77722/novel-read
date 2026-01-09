import { BellIcon } from 'lucide-react';

import styled from 'styled-components';
import { useUnreadNotificationCount } from '../features/notifications/useUnreadNotificationCount';
import SpinnerMini from './SpinnerMini';

import { useNotificationSound } from '../hooks/useNotificationSound';
import { useNotificationSettings } from '../context/NotificationSettingsContext';

const NotificationBadge = styled.span`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--color-red-700);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0 0.35rem;
  line-height: 1;
`;

function NotificationsBell() {
  const { data: count, isPending } = useUnreadNotificationCount();
  const { settings } = useNotificationSettings();

  useNotificationSound(count, settings.soundEnabled);

  if (isPending) return <SpinnerMini />;

  const showBadge = settings.counterEnabled && count > 0;

  return (
    <div>
      <BellIcon size={20} />
      {showBadge && (
        <NotificationBadge>{count > 99 ? '99+' : count}</NotificationBadge>
      )}
    </div>
  );
}

export default NotificationsBell;
