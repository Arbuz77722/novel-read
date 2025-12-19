import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChapters } from '../../services/apiBooks';
import { CHAPTERS_PAGE_SIZE } from '../../utils/constants';

export function useChapters(bookId, page) {
  const queryClient = useQueryClient();

  const {
    data,
    isPending: isChaptersLoading,
    error,
  } = useQuery({
    queryKey: ['chapters', bookId, page],
    queryFn: () => getChapters({ bookId, page }),
    enabled: !!bookId && !!page,
  });

  const chapters = data?.chapters ?? [];
  const count = data?.count ?? 0;
  const pageCount = Math.ceil(count / CHAPTERS_PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['chapters', bookId, page + 1],
      queryFn: () => getChapters({ bookId, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['chapters', bookId, page - 1],
      queryFn: () => getChapters({ bookId, page: page - 1 }),
    });
  }

  return { chapters, isChaptersLoading, error, count, pageCount };
}
