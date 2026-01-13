import BookHeader from './BookHeader';
import TableOfContents from './TableOfContents';
import { useLocation, useParams } from 'react-router-dom';
import { useBook } from './useBook';
import Spinner from '../../ui/Spinner';
import styled from 'styled-components';
import useAddBookViews from './useAddBookViews';
import { useEffect } from 'react';
import { useUser } from '../authentication/useUser';
import ReviewsSection from '../reviews/ReviewsSection';
import CommentSection from '../comments/CommentSection';
import ErrorState from '../../ui/ErrorState';

const StyledDiv = styled.div`
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NoUserMessage = styled.p`
  max-width: 50rem;
  border-radius: 7px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-brand-100);
  padding: 2rem;
  background-color: var(--color-grey-50);
  margin: 15rem auto;
`;

const BookFooter = styled.div`
  margin-top: 15rem;
`;

function BookDescription() {
  const { slug } = useParams();
  const { user, isAuthenticated } = useUser();
  const { book, isBookLoading, isError } = useBook(slug);
  const { addViews } = useAddBookViews();
  const location = useLocation();
  useEffect(() => {
    if (!book?.id || !addViews) return;
    addViews({ bookId: book.id, userId: user?.id || null });
  }, [addViews, book?.id, user?.id]);

  if (isBookLoading) return <Spinner />;
  if (isError)
    return (
      <ErrorState
        title='Something went wrong'
        message='We couldn’t load your data. Please refresh the page.'
      />
    );
  if (!book) return <p>Book not found</p>;

  return (
    <StyledDiv>
      <BookHeader book={book} />
      <ReviewsSection book={book} />
      <TableOfContents bookId={book.id} slug={slug} />
      {!user || !isAuthenticated ? (
        <NoUserMessage>Only logged in user can see the comments.</NoUserMessage>
      ) : (
        <BookFooter>
          <CommentSection
            targetId={book.id}
            targetType='chapter'
            expandCommentId={location.state?.expandCommentId}
          />
        </BookFooter>
      )}
    </StyledDiv>
  );
}

export default BookDescription;
