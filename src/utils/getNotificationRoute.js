function getNotificationRoute({ commentId, reviewId, slug, parentCommentId }) {
  if (reviewId) {
    return {
      pathname: `/books/${slug}/reviews`,
      state: { scrollTo: `review-${reviewId}` },
    };
  }
  if (commentId) {
    return {
      pathname: `/books/${slug}`,
      state: {
        scrollTo: `comment-${commentId}`,
        expandCommentId: parentCommentId || null,
      },
    };
  }
  return { pathname: `/books/${slug}` };
}

export default getNotificationRoute;
