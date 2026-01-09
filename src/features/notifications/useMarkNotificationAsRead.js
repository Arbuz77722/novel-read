import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationAsRead } from '../../services/apiNotifications';

function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: (notificationId) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
  return { markAsRead, isPending };
}

export default useMarkNotificationAsRead;
