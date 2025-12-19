import { useNavigate } from 'react-router-dom';

export function useContinueReading() {
  const navigate = useNavigate();

  function continueReading(book) {
    const { slug, firstChapterId, lastReadChapter } = book;

    const targetChapter = lastReadChapter ?? firstChapterId;

    if (!targetChapter) return;

    navigate(`/books/${slug}/chapter/${targetChapter}`);
  }

  return { continueReading };
}
