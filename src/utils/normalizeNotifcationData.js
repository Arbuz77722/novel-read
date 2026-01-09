function normalizeNotifcationData(data) {
  return {
    actorId: data.actor.id,
    actorName: data.actor.username,
    actorAvatar: data.actor.avatar_url,

    notifcationId: data.id,
    commentId: data.comment_id,
    reviewId: data.review_id,
    parentCommentId: data.parent_comment_id,

    notificationType: data.type,
    bookId: data.book_id,
    isRead: data.is_read,
    time: data.created_at,

    commentText: data.comment?.comment || null,
    reviewText: data.review?.review || null,
  };
}

export default normalizeNotifcationData;
