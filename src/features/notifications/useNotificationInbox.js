import { useQuery } from '@tanstack/react-query';
import { getNotificationInbox } from '../../services/apiNotifications';

export function useNotificationInbox(limit = 8) {
  const { data, error, isPending } = useQuery({
    queryKey: ['notifications, inbox', limit],
    queryFn: () => getNotificationInbox(limit),
  });
  return { inbox: data ?? [], error, isPending };
}
