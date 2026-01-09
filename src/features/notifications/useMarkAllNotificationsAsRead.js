import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAllNotificationsAsRead } from '../../services/apiNotifications';

function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();
  const { mutate: markAllAsRead, isPending } = useMutation({
    mutationFn: (notificationId) => markAllNotificationsAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
  return { markAllAsRead, isPending };
}

export default useMarkAllNotificationsAsRead;
