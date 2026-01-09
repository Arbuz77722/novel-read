import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as createCommentApi } from '../../services/apiComments';

export default function useCreateComment({ targetType, targetId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ comment, parentId }) =>
      createCommentApi({ targetType, targetId, comment, parentId }),

    onSuccess: (newComment) => {
      // newComment is now properly returned
      if (newComment.parent_id) {
        queryClient.invalidateQueries({
          queryKey: ['replies', newComment.parent_id],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['comments', targetId, targetType],
        });
      }
    },

    onError: (err) => {
      console.error('Failed to create comment:', err);
      // You can add toast notification here later
    },
  });

  return {
    createComment: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
