import { useQuery } from '@tanstack/react-query';
import { getSlugById } from '../../services/apiBooks';

function useGetSlugById(bookId) {
  const { data, isPending, error } = useQuery({
    queryKey: ['book-slug', bookId],
    queryFn: () => getSlugById(bookId),
    enabled: !!bookId,
  });

  const slug = data?.slug ?? null;
  const title = data?.title ?? null;

  return { slug, title, error, isPending };
}

export default useGetSlugById;
