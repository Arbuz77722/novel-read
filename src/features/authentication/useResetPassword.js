import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePassword, isPending };
}
