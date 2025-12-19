import { useQuery } from '@tanstack/react-query';
import { getBookTags } from '../../services/apiBooks';

export default function useBookTags({ bookId }) {
  const {
    data: bookTags = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookTags', bookId],
    queryFn: () => getBookTags(bookId),
  });

  return { bookTags, isPending, error };
}
