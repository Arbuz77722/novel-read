import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks } from '../../services/apiBooks';
import { PAGE_SIZE } from '../../utils/constants';

export default function useBooksBase(params = {}, options = {}) {
  const queryClient = useQueryClient();

  const {
    status = 'all',
    orderBy = 'new',
    page = 1,
    query = '',
    genres = ['all'],
    types = [],
    languages = [],
    ranges,
    sort = 'desc',
    genreMode = 'and',
    includeTags,
    excludeTags,
    ratingMin,
    ratingMax,
    ranking,
    limit, // ✅ include limit
  } = params;

  const { data, isPending: isBookLoading } = useQuery({
    queryKey: [
      'books',
      {
        status,
        orderBy,
        page,
        query,
        genres,
        types,
        languages,
        ranges,
        sort,
        genreMode,
        includeTags,
        excludeTags,
        ratingMin,
        ratingMax,
        ranking,
        limit, // ✅ include in queryKey
      },
    ],
    queryFn: () =>
      getBooks({
        status,
        orderBy,
        page,
        query,
        genres,
        types,
        languages,
        ranges,
        sort,
        genreMode,
        includeTags,
        excludeTags,
        ratingMin,
        ratingMax,
        ranking,
        limit, // ✅ pass to fetcher
      }),
    ...options,
  });

  const books = Array.isArray(data?.books) ? data.books : [];
  const count = data?.count ?? 0;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // Prefetch next and previous pages (only for normal browse, not ranking sections)
  if (!limit && page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: [
        'books',
        {
          status,
          orderBy,
          page: page + 1,
          query,
          genres,
          types,
          languages,
          ranges,
          sort,
          genreMode,
          includeTags,
          excludeTags,
          ratingMin,
          ratingMax,
          ranking,
        },
      ],
      queryFn: () =>
        getBooks({
          status,
          orderBy,
          page: page + 1,
          query,
          genres,
          types,
          languages,
          ranges,
          sort,
          genreMode,
          includeTags,
          excludeTags,
          ratingMin,
          ratingMax,
          ranking,
        }),
    });
  }

  if (!limit && page > 1) {
    queryClient.prefetchQuery({
      queryKey: [
        'books',
        {
          status,
          orderBy,
          page: page - 1,
          query,
          genres,
          types,
          languages,
          ranges,
          sort,
          genreMode,
          includeTags,
          excludeTags,
          ratingMin,
          ratingMax,
          ranking,
        },
      ],
      queryFn: () =>
        getBooks({
          status,
          orderBy,
          page: page - 1,
          query,
          genres,
          types,
          languages,
          ranges,
          sort,
          genreMode,
          includeTags,
          excludeTags,
          ratingMin,
          ratingMax,
          ranking,
        }),
    });
  }

  return { books, count, page, pageCount, isBookLoading };
}
