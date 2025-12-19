import ReviewCardItem from '../../ui/ReviewCardItem';

export function ReviewCard({ reviews }) {
  return (
    <div>
      {reviews.map((r) => (
        <ReviewCardItem key={r.id} review={r} />
      ))}
    </div>
  );
}
