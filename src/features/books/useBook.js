import { useQuery } from '@tanstack/react-query';
import { getBook } from '../../services/apiBooks';

export function useBook(slug) {
  const {
    data: book,
    isPending: isBookLoading,
    isError,
  } = useQuery({
    queryKey: ['book', slug],
    queryFn: () => getBook(slug),
    enabled: !!slug,
  });

  return { book, isBookLoading, isError };
}
