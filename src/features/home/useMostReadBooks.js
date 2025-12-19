import { useQuery } from '@tanstack/react-query';
import { getMostReadBooks } from '../../services/apiBooks';

export default function useMostReadBooks() {
  const {
    data: mostReadBooks,
    error,
    isPending,
  } = useQuery({
    queryKey: ['read'],
    queryFn: getMostReadBooks,
  });
  if (error) throw new Error(error.message);
  return { mostReadBooks, isPending };
}
