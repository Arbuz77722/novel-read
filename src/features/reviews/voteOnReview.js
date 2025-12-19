import { useMutation, useQueryClient } from '@tanstack/react-query';
import { voteOnReview } from '../../services/apiReviews';

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, vote }) => voteOnReview(reviewId, vote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookReviewsWithProfiles'] });
    },
  });
}
