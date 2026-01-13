import { useMutation, useQueryClient } from '@tanstack/react-query';
import { voteOnComments } from '../../services/apiComments';

export function useCommentVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, vote }) => voteOnComments(commentId, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['replies'] });
    },
  });
}
