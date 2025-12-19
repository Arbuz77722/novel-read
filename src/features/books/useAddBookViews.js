import { useMutation } from '@tanstack/react-query';
import { addBookViews } from '../../services/apiBooks';

export default function useAddBookViews() {
  const { mutate: addViews, isPending } = useMutation({
    mutationFn: ({ bookId, userId }) => addBookViews({ bookId, userId }),
  });
  return { addViews, isPending };
}
