import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const { isPending: isUserPending, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  return {
    isUserPending,
    user,
    isAuthenticated: user?.role === 'authenticated',
  };
}
