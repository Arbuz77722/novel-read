import { useQuery } from '@tanstack/react-query';
import { getBookGenre } from '../../services/apiBooks';

export default function useBookGenre({ bookId }) {
  const {
    data: bookGenre = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookGenre', bookId],
    queryFn: () => getBookGenre(bookId),
  });

  return { bookGenre, isPending, error };
}
