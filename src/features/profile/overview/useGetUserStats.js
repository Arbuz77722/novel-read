import { useQuery } from '@tanstack/react-query';
import { getUserStats } from '../../../services/apiUserStats';

function useGetUserStats() {
  const { data, error, isPending } = useQuery({
    queryKey: ['overview'],
    queryFn: getUserStats,
  });

  return { data, isPending, error };
}

export default useGetUserStats;
