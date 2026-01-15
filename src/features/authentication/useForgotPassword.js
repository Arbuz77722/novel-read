import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { forgotPassword } from '../../services/apiAuth';

export default function useForgotPassword() {
  const { mutate: sendResetEmail, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link sent to your email');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendResetEmail, isPending };
}
