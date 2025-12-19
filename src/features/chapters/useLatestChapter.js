import { useQuery } from '@tanstack/react-query';
import { getLatestChapter } from '../../services/apiBooks';

export function useLatestChapter(chapterId) {
  const {
    data: chapter,
    error,
    isPending,
  } = useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: () => getLatestChapter(chapterId),
    enabled: !!chapterId,
  });

  return { chapter, error, isPending };
}
