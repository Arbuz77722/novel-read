import { createContext, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdvancedSearchContext = createContext();
export function AdvancedSearchProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // Applied filters (source of truth, always from URL)
  const appliedFilters = {
    types: searchParams.get('types')?.split(',').filter(Boolean) || [],
    languages: searchParams.get('languages')?.split(',').filter(Boolean) || [],
    genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
    min: searchParams.get('min') || '',
    max: searchParams.get('max') || '',
    status: searchParams.get('status') || 'all',
    order: searchParams.get('order') || 'new',
    sort: searchParams.get('sort') || 'desc',
    genreMode: searchParams.get('genreMode') || 'and',
    includeTags:
      searchParams.get('includeTags')?.split(',').filter(Boolean) || [],
    excludeTags:
      searchParams.get('excludeTags')?.split(',').filter(Boolean) || [],
    ratingMin: searchParams.get('ratingMin') || '',
    ratingMax: searchParams.get('ratingMax') || '',
  };

  const [draftFilters, setDraftFilters] = useState(appliedFilters);
  function applyFilters() {
    const params = new URLSearchParams();

    if (draftFilters.types?.length)
      params.set('types', draftFilters.types.join(','));
    if (draftFilters.languages?.length)
      params.set('languages', draftFilters.languages.join(','));
    if (draftFilters.genres?.length)
      params.set('genres', draftFilters.genres.join(','));
    if (draftFilters.min) params.set('min', draftFilters.min);
    if (draftFilters.max) params.set('max', draftFilters.max);
    if (draftFilters.status) params.set('status', draftFilters.status);
    if (draftFilters.order) params.set('order', draftFilters.order);
    if (draftFilters.sort) params.set('sort', draftFilters.sort);
    if (draftFilters.genreMode) params.set('genreMode', draftFilters.genreMode);
    if (draftFilters.includeTags?.length)
      params.set('includeTags', draftFilters.includeTags.join(','));
    if (draftFilters.excludeTags?.length)
      params.set('excludeTags', draftFilters.excludeTags.join(','));
    if (draftFilters.ratingMin) params.set('ratingMin', draftFilters.ratingMin);
    if (draftFilters.ratingMax) params.set('ratingMax', draftFilters.ratingMax);

    setSearchParams(params); // updates URL → refetch
    navigate(`/search/advanced-search/results?${params.toString()}`);
  }

  function resetFilters() {
    const reset = {
      types: [],
      languages: [],
      genres: [],
      min: '',
      max: '',
      status: 'all',
      order: 'new',
      sort: 'desc',
      genreMode: 'and',
      includeTags: [],
      excludeTags: [],
      ratingMin: '',
      ratingMax: '',
    };
    setDraftFilters(reset);
    setSearchParams({});
  }

  const hasActiveFilters =
    draftFilters.types.length > 0 ||
    draftFilters.languages.length > 0 ||
    draftFilters.genres.length > 0 ||
    draftFilters.includeTags.length > 0 ||
    draftFilters.excludeTags.length > 0 ||
    draftFilters.min ||
    draftFilters.max ||
    draftFilters.ratingMin ||
    draftFilters.ratingMax ||
    draftFilters.status !== 'all' ||
    draftFilters.order !== 'new' ||
    draftFilters.sort !== 'desc' ||
    draftFilters.genreMode !== 'and';

  return (
    <AdvancedSearchContext.Provider
      value={{
        draftFilters,
        setDraftFilters,
        appliedFilters,
        applyFilters,
        resetFilters,
        hasActiveFilters,
      }}
    >
      {children}
    </AdvancedSearchContext.Provider>
  );
}

export function useAdvancedSearch() {
  const context = useContext(AdvancedSearchContext);
  if (!context) {
    throw new Error(
      'useAdvancedSearch must be used within an AdvancedSearchProvider'
    );
  }
  return context;
}
