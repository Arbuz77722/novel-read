import ReviewCardItem from '../../ui/ReviewCardItem';
import ReviewsListSkeleton from '../../ui/skeletons/ReviewsListSkeleton';

export function ReviewCard({ reviews, isPending }) {
  if (isPending) return <ReviewsListSkeleton />;
  return (
    <div>
      {reviews.map((r) => (
        <ReviewCardItem key={r.id} review={r} />
      ))}
    </div>
  );
}
