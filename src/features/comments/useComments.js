import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRootComments } from '../../services/apiComments';
import { PAGE_SIZE } from '../../utils/constants';

export default function useComments({ targetId, targetType, page }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['comments', targetId, targetType, page],
    queryFn: () =>
      getRootComments({ targetId, targetType, page, pageSize: PAGE_SIZE }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', targetId, targetType, page],
      });
    },
  });

  return {
    comments: data?.data ?? [],
    count: data?.count ?? 0,
    isPending,
  };
}
