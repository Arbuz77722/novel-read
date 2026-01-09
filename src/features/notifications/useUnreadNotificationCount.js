import { useQuery } from '@tanstack/react-query';
import { getUnreadNotificationCount } from '../../services/apiNotifications';

export function useUnreadNotificationCount() {
  const { data, isPending } = useQuery({
    queryKey: ['notifications', 'unreadCount'],
    queryFn: getUnreadNotificationCount,
    staleTime: 10 * 1000,
  });
  return { data, isPending };
}
