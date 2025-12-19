import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        'Account successfully created! Please verify email address from user email'
      );
      navigate('/', { replace: true });
    },
    onError: (error) => {
      toast.error(
        error?.message || 'Account could not be created. Please try again'
      );
    },
  });
  return { signup, isPending };
}
