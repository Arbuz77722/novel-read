export function NotificationLabel({
  notificationType,
  actorName,
  bookTitle,
  chapterNumber,
}) {
  const Name = <strong>{actorName}</strong>;
  const Book = <strong>{bookTitle}</strong>;

  const Chapter = chapterNumber ? (
    <span>{` chapter ${chapterNumber}`} of </span>
  ) : null;

  switch (notificationType) {
    case 'comment_like':
      return (
        <>
          {Name} liked your comment on {Chapter} {Book}
        </>
      );

    case 'comment_dislike':
      return (
        <>
          {Name} disliked your comment on {Chapter} {Book}
        </>
      );

    case 'comment_reply':
      return (
        <>
          {Name} replied to your comment on {Chapter} {Book}
        </>
      );

    case 'review_like':
      return (
        <>
          {Name} liked your review on {Book}
        </>
      );

    case 'review_reply':
      return (
        <>
          {Name} replied to your review on {Book}
        </>
      );

    case 'review_dislike':
      return (
        <>
          {Name} disliked your review on {Book}
        </>
      );

    default:
      return <>You have a new notification</>;
  }
}
