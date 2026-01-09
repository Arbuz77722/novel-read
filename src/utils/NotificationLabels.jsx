export function NotificationLabel({ notificationType, actorName, title }) {
  const Name = <strong>{actorName}</strong>;
  const Title = <strong>{title}</strong>;

  switch (notificationType) {
    case 'comment_like':
      return (
        <>
          {Name} liked your comment on {Title}
        </>
      );

    case 'comment_dislike':
      return (
        <>
          {Name} disliked your comment on {Title}
        </>
      );

    case 'comment_reply':
      return (
        <>
          {Name} replied to your comment on {Title}
        </>
      );

    case 'review_like':
      return (
        <>
          {Name} liked your review on {Title}
        </>
      );

    case 'review_reply':
      return (
        <>
          {Name} replied to your review on {Title}
        </>
      );

    case 'review_dislike':
      return (
        <>
          {Name} disliked your review on {Title}
        </>
      );

    default:
      return <>You have a new notification</>;
  }
}
