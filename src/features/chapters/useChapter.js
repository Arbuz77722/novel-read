import { useQuery } from '@tanstack/react-query';
import { getChapter } from '../../services/apiBooks';

export function useChapter(bookId, chapterId) {
  const { data } = useQuery({
    queryKey: ['chapter', bookId, chapterId],
    queryFn: () => getChapter(bookId, chapterId),
    enabled: !!bookId && !!chapterId,
  });

  return { data };
}
