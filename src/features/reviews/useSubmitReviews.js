import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitReview as submitReviewApi } from '../../services/apiReviews';
import toast from 'react-hot-toast';

export function useSubmitReviews(bookId) {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: submitReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', bookId]);
      toast.success('Review successfully posted!');
    },
    onError: (err) => {
      console.error('Submit review error:', err);
      toast.error(`Failed to post review: ${err.message}`);
    },
  });

  return { submitReview, isPending };
}
