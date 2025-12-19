import { useQuery } from '@tanstack/react-query';
import { getLibrary } from '../../../services/apiProfile';

export default function useGetLibraryBooks() {
  const {
    data: library,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['library'],
    queryFn: getLibrary,
  });
  return { library, isPending, isError, error };
}
