import ReviewHeader from './ReviewHeader';
import ReviewFilter from './ReviewFilter';
import { ReviewCard } from './ReviewCard';
import StyledHeading from '../../ui/StyledHeading';
import styled from 'styled-components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useBook } from '../books/useBook';
import Spinner from '../../ui/Spinner';
import { useBookReviewsWithProfiles } from './useBookReviewsWithProfiles';
import BackButton from '../../ui/BackButton';

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
  if (isBookLoading) return <Spinner />;
  if (!book) return <p>Book not found</p>;

  return (
    <StyledReviewList>
      <StyledHeading noWidth heading='Reviews' />
      <BackButton />
      <ReviewHeader book={book} reviews={reviewsWithProfiles} />
      <ReviewFilter reviews={reviewsWithProfiles} />
      {isPending ? <Spinner /> : <ReviewCard reviews={reviewsWithProfiles} />}
    </StyledReviewList>
  );
}

export default ReviewsList;
