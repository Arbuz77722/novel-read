import { useSearchParams } from 'react-router-dom';

export default function useBrowseParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function toggleGenre(id) {
    const current =
      searchParams.get('genres')?.split(',').filter(Boolean) || [];
    const stringId = String(id);
    let updated;

    if (id === 'all') {
      updated = ['all'];
    } else {
      updated = current.filter((g) => g !== 'all');
      if (updated.includes(stringId)) {
        updated = updated.filter((g) => g !== stringId);
      } else {
        updated = [...updated, stringId];
      }
    }

    const params = new URLSearchParams(searchParams);
    if (updated.length > 0) {
      params.set('genres', updated.join(','));
    } else {
      params.delete('genres');
    }
    params.set('page', '1');
    setSearchParams(params);
  }

  function setOrder(order) {
    const params = new URLSearchParams(searchParams);
    params.set('order', order.toLowerCase());
    params.set('page', '1');
    setSearchParams(params);
  }

  function setStatus(status) {
    const params = new URLSearchParams(searchParams);
    params.set('status', status.toLowerCase());
    params.set('page', '1');
    setSearchParams(params);
  }

  function setReviewsFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter.toLowerCase());
    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams({}, { replace: true });
  }

  function toggleType(type) {
    const current = searchParams.get('types')?.split(',').filter(Boolean) || [];
    let updated;
    if (current.includes(type)) {
      updated = current.filter((t) => t !== type);
    } else {
      updated = [...current, type];
    }
    const params = new URLSearchParams(searchParams);
    if (updated.length > 0) {
      params.set('types', updated.join(','));
    } else {
      params.delete('types');
    }
    params.set('page', '1');
    setSearchParams(params);
  }

  function toggleLanguage(language) {
    const current =
      searchParams.get('languages')?.split(',').filter(Boolean) || [];
    let updated;
    if (current.includes(language)) {
      updated = current.filter((l) => l !== language);
    } else {
      updated = [...current, language];
    }
    const params = new URLSearchParams(searchParams);
    if (updated.length > 0) {
      params.set('languages', updated.join(','));
    } else {
      params.delete('languages');
    }
    params.set('page', '1');
    setSearchParams(params);
  }

  const selectedGenres =
    searchParams.get('genres')?.split(',').filter(Boolean) || [];
  const selectedOrder = searchParams.get('order') || 'new';
  const selectedStatus = searchParams.get('status') || 'all';
  const selectedTypes =
    searchParams.get('types')?.split(',').filter(Boolean) || [];
  const selectedLanguages =
    searchParams.get('languages')?.split(',').filter(Boolean) || [];
  const selectedReviewsFilter = searchParams.get('filter') || 'most liked';

  const hasActiveFilters =
    !(
      selectedGenres.length === 0 ||
      (selectedGenres.length === 1 && selectedGenres[0] === 'all')
    ) ||
    selectedTypes.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedOrder !== 'new' ||
    selectedStatus !== 'all';

  return {
    searchParams,
    setSearchParams,
    toggleGenre,
    setOrder,
    selectedOrder,
    setStatus,
    selectedStatus,
    resetFilters,
    selectedGenres,
    hasActiveFilters,
    selectedTypes,
    selectedLanguages,
    toggleType,
    toggleLanguage,
    setReviewsFilter,
    selectedReviewsFilter,
  };
}
