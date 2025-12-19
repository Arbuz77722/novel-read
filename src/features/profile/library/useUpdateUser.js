import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../../services/apiAuth';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUploading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('Account successfully updated');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },

    onError: (err) => {
      console.error('Update user error:', err);
      toast.error(err.message || 'Account could not be updated');
    },
  });

  return { updateUser, isUploading };
}
