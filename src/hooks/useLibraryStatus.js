import { useEffect, useState } from 'react';
import { useLibrary } from '../features/books/useLibrary';
import { useAddToLibrary } from '../features/profile/library/useAddToLibrary';

export default function useLibraryStatus(bookId) {
  const { addToLibrary } = useAddToLibrary();
  const { library } = useLibrary();
  const existing = library?.find((item) => item.book_id === bookId);
  const [libraryStatus, setLibraryStatus] = useState('');

  useEffect(() => {
    if (existing?.status) {
      setLibraryStatus(existing.status);
    }
  }, [existing]);

  function updateStatus(newStatus) {
    setLibraryStatus(newStatus);
    addToLibrary({ bookId, status: newStatus });
  }
  return { libraryStatus, updateStatus, isInLibrary: !!existing };
}
