import { useQuery } from '@tanstack/react-query';
import { getBookReviews } from '../../services/apiReviews';

export function useBookReviews(bookId, filter) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['reviews', bookId],
    queryFn: () => getBookReviews(bookId, filter),
    enabled: !!bookId,
  });

  return { reviews: reviews || [], isLoading, error };
}
