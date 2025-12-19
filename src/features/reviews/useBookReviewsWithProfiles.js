import { useQuery } from '@tanstack/react-query';
import { getUserReviews } from '../../services/apiReviews';

export function useBookReviewsWithProfiles(bookId, filter) {
  const { data, isPending, error } = useQuery({
    queryKey: ['bookReviewsWithProfiles', bookId, filter],
    queryFn: () => getUserReviews(bookId, filter),
    enabled: !!bookId,
  });

  return { reviews: data || [], isPending, error };
}
