import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo || location.state?.expandCommentId) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [
    location.pathname,
    location.state?.scrollTo,
    location.state?.expandCommentId,
  ]);

  return null;
}

export default ScrollToTop;
