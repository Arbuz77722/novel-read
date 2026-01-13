import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as createCommentApi } from '../../services/apiComments';

export default function useCreateComment({ targetType, targetId }) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ comment, parentId }) =>
      createCommentApi({ targetType, targetId, comment, parentId }),

    onSuccess: (newComment) => {
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
      if (import.meta.env.DEV) {
        console.error(err);
      }
    },
  });

  return {
    createComment: mutate,
    isPending,
    isError,
    error,
  };
}
