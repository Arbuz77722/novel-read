import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../../services/apiBooks';

export function useGenres() {
  const {
    data: genres = [],
    isPending: isGenreLoading,
    error,
  } = useQuery({
    queryFn: getGenres,
    queryKey: ['genres'],
  });

  if (error) {
    console.error('Genre fetch error:', error);
  }

  return { genres, isGenreLoading, error };
}
