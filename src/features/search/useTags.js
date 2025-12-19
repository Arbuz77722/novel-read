import { useQuery } from '@tanstack/react-query';
import { getTags } from '../../services/apiBooks';

export default function useTags() {
  const {
    data: tags = [],
    isPending: isTagsLoading,
    error,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    select: (data) =>
      data.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })),
  });
  if (error) {
    console.error('Genre fetch error:', error);
  }
  return { tags, isTagsLoading, error };
}
