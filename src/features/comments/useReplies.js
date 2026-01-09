import { useQuery } from '@tanstack/react-query';
import { getReplies } from '../../services/apiComments';

function useReplies(parentId) {
  const { data, error, isPending } = useQuery({
    queryKey: ['replies', parentId],
    queryFn: () => getReplies(parentId),
    enabled: !!parentId,
  });

  return { replies: data, error, isPending };
}

export default useReplies;
