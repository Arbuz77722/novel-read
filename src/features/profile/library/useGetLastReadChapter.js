import { useQuery } from '@tanstack/react-query';
import { getLastReadChapter } from '../../../services/apiProfile';

function useGetLastReadChapter(bookId) {
  const { data: lastReadChapter, isPending } = useQuery({
    queryKey: ['lastRead', bookId],
    queryFn: () => getLastReadChapter(bookId),
  });
  return { lastReadChapter, isPending };
}

export default useGetLastReadChapter;
