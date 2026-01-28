import { useQuery } from '@tanstack/react-query';
import { getChapterNeighbors } from '../../services/apiBooks';

export function useChapterNavigation(bookId, chapter) {
  const { data } = useQuery({
    queryKey: ['chapter-navigation', bookId, chapter?.number],
    queryFn: () => getChapterNeighbors(bookId, chapter.number),
    enabled: !!bookId && !!chapter?.number,
  });
  return { nav: data };
}
