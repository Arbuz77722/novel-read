import { useQuery } from '@tanstack/react-query';
import { getSearchResults } from '../../services/apiBooks';

export default function useSearchBooks(query) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['searchBooks', query],
    queryFn: () => getSearchResults(query),
    enabled: !!query && query.length >= 3,
  });

  const books = Array.isArray(data) ? data : [];
  return { books, error, isLoading };
}
