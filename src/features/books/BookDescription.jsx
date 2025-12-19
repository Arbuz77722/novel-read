import BookHeader from './BookHeader';
import TableOfContents from './TableOfContents';
import { useParams } from 'react-router-dom';
import { useBook } from './useBook';
import Spinner from '../../ui/Spinner';
import styled from 'styled-components';
import useAddBookViews from './useAddBookViews';
import { useEffect } from 'react';
import { useUser } from '../authentication/useUser';
import ReviewsSection from '../reviews/ReviewsSection';

const StyledDiv = styled.div`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function BookDescription() {
  const { slug } = useParams();
  const { user } = useUser();
  const { book, isBookLoading } = useBook(slug);
  const { addViews } = useAddBookViews();

  useEffect(() => {
    if (!book?.id || !addViews) return;
    addViews({ bookId: book.id, userId: user?.id || null });
  }, [addViews, book?.id, user?.id]);

  if (isBookLoading) return <Spinner />;
  if (!book) return <p>Book not found</p>;

  return (
    <StyledDiv>
      <BookHeader book={book} />
      <ReviewsSection book={book} />
      <TableOfContents bookId={book.id} slug={slug} />
    </StyledDiv>
  );
}

export default BookDescription;
