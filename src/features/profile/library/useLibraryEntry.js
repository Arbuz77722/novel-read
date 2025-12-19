import { useQuery } from '@tanstack/react-query';
import { getLibraryEntry } from '../../../services/apiProfile';

export function useLibraryEntry(bookId) {
  const { data, isPending } = useQuery({
    queryKey: ['library-entry', bookId],
    queryFn: () => getLibraryEntry(bookId),
  });

  return {
    libraryEntry: data,
    isPending,
  };
}
