import { useLocation } from 'react-router-dom';
import { useAdvancedSearch } from '../../context/AdvancedSearchProvider';
import useBrowseParams from '../../hooks/useBrowseParams';
import useBooksBase from './useBooksBase';

export function useBooks({ mode } = {}) {
  const location = useLocation();

  const resolvedMode =
    mode ||
    (location.pathname.includes('advanced-search') ? 'advanced' : 'browse');

  const page = Number(new URLSearchParams(location.search).get('page')) || 1;

  if (resolvedMode === 'advanced') {
    const { appliedFilters } = useAdvancedSearch();
    const {
      status,
      order,
      genres,
      types,
      languages,
      min,
      max,
      sort,
      genreMode,
      includeTags,
      excludeTags,
      ratingMin,
      ratingMax,
    } = appliedFilters;

    return useBooksBase({
      status,
      orderBy: order,
      page,
      genres,
      types,
      languages,
      ranges: { min, max },
      sort,
      genreMode,
      includeTags,
      excludeTags,
      ratingMin,
      ratingMax,
    });
  }

  const {
    selectedStatus,
    selectedOrder,
    selectedGenres,
    selectedTypes,
    selectedLanguages,
  } = useBrowseParams();

  return useBooksBase({
    status: selectedStatus,
    orderBy: selectedOrder,
    page,
    genres: selectedGenres,
    types: selectedTypes,
    languages: selectedLanguages,
  });
}
