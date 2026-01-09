import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLastReadChapter as updateLastReadChapterApi } from '../../../services/apiProfile';

function useUpdateLastReadChapter() {
  const queryClient = useQueryClient();
  const { mutate: updateLastReadChapter, isPending } = useMutation({
    mutationFn: ({ bookId, chapterId }) =>
      updateLastReadChapterApi({ bookId, chapterId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lastRead'] });
    },
  });
  return { updateLastReadChapter, isPending };
}

export default useUpdateLastReadChapter;
