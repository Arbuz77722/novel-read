import ReviewHeader from './ReviewHeader';
import ReviewFilter from './ReviewFilter';
import { ReviewCard } from './ReviewCard';
import StyledHeading from '../../ui/StyledHeading';
import styled from 'styled-components';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useBook } from '../books/useBook';
import Spinner from '../../ui/Spinner';
import { useBookReviewsWithProfiles } from './useBookReviewsWithProfiles';
import BackButton from '../../ui/BackButton';
import ReviewHeaderSkeleton from '../../ui/skeletons/ReviewHeaderSkeleton';
import ReviewFilterSkeleton from '../../ui/skeletons/ReviewFilterSkeleton';
import { useEffect } from 'react';

const StyledReviewList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function ReviewsList() {
  const { slug } = useParams();
  const { book, isBookLoading } = useBook(slug);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'most liked';
  const { reviews: reviewsWithProfiles, isPending } =
    useBookReviewsWithProfiles(book?.id, filter);

  const location = useLocation();

  useEffect(() => {
    if (isPending) return;
    if (!location.state?.scrollTo) return;

    const el = document.getElementById(location.state.scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.scrollTo, isPending]);

  if (isBookLoading || isPending) {
    return (
      <>
        <ReviewHeaderSkeleton />
        <ReviewFilterSkeleton />
      </>
    );
  }

  return (
    <StyledReviewList>
      <StyledHeading noWidth heading='Reviews' />
      <BackButton />
      <ReviewHeader book={book} reviews={reviewsWithProfiles} />
      <ReviewFilter reviews={reviewsWithProfiles} />
      {isPending ? (
        <Spinner />
      ) : (
        <ReviewCard isPending={isPending} reviews={reviewsWithProfiles} />
      )}
    </StyledReviewList>
  );
}

export default ReviewsList;
