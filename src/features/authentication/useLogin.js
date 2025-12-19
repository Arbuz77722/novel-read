import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect.');
    },
  });
  return { login, isLoggingIn };
}
