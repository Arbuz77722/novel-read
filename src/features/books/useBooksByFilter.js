import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../services/apiBooks';

export function useBooksByFilter({ status, orderBy, ranking, limit }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['books', { status, orderBy, ranking, limit }],
    queryFn: () =>
      getBooks({
        status,
        orderBy,
        ranking,
        limit,
      }),
  });

  const books = Array.isArray(data?.books) ? data.books : [];

  return { books, isPending, error };
}
