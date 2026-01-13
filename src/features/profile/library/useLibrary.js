import { useQuery } from '@tanstack/react-query';
import { getLibrary } from '../../../services/apiProfile';

export function useLibrary() {
  const {
    data: library,
    isPending: IsLibraryLoading,
    error,
  } = useQuery({
    queryKey: ['library'],
    queryFn: getLibrary,
  });

  return { library, IsLibraryLoading, error };
}
