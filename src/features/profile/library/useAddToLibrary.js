import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToLibrary as addToLibraryApi } from '../../../services/apiProfile';
import toast from 'react-hot-toast';

export function useAddToLibrary() {
  const queryClient = useQueryClient();

  const { mutate: addToLibrary, isPending } = useMutation({
    mutationFn: ({ bookId, status }) => addToLibraryApi({ bookId, status }),

    onSuccess: () => {
      toast.success('Library updated!');

      queryClient.invalidateQueries({ queryKey: ['library'] });
      queryClient.invalidateQueries({ queryKey: ['book'] });
    },

    onError: (err) => {
      toast.error(err.message || 'Failed to update library');
    },
  });

  return { addToLibrary, isPending };
}
