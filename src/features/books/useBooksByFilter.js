import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../services/apiBooks';

//For home sections teasers
export function useBooksByFilter({ status, orderBy, limit }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['books', { status, orderBy, limit }],
    queryFn: () => getBooks({ status, orderBy, limit }),
  });
  const books = Array.isArray(data?.books) ? data.books : [];

  return { books, isPending, error };
}
