import { useNavigate } from 'react-router-dom';

export function useBookNavigation() {
  const navigate = useNavigate();
  function goToBook(book) {
    navigate(`/books/${book.slug}`);
  }

  return { goToBook };
}
