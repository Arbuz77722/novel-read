import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotifications } from '../../services/apiNotifications';

const PAGE_SIZE = 20;

function useInfiniteNotifications() {
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 0 }) => getNotifications(pageParam, PAGE_SIZE),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });

  const notifications = data?.pages.flat() ?? [];

  return {
    notifications,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export default useInfiniteNotifications;
