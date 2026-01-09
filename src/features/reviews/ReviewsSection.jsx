import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import StarRating from '../../ui/StarRating';
import RatingDistribution from '../../ui/RatingDistribution';
import WriteReviewModal from './WriteReviewModal';
import LoginPromptModal from '../../ui/LoginPromptModal';
import { useUser } from '../authentication/useUser';
import { useBookReviews } from './useBookReviews';
import { useSubmitReviews } from './useSubmitReviews';
import { useState } from 'react';
import { calculateReviewStats } from '../../utils/calculateReviewStats';
import ReviewsSectionSkeleton from '../../ui/skeletons/ReviewsSectionSkeleton';

const ReviewsContainer = styled.div`
  padding: 3rem;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-0);
  border-radius: 12px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem;
  }
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderTitle = styled.h2`
  color: var(--color-grey-900);
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 0;
`;

const CharacteristicsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CharacteristicRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WriteReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const WriteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const Reviewed = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-green-100);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  width: fit-content;
`;

const MoreReviewsLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: var(--color-brand-600);
  font-weight: 600;
  font-size: 1.4rem;
  transition: color 0.3s;

  &:hover {
    color: var(--color-brand-700);
    text-decoration: underline;
  }
`;

export default function ReviewsSection({ book }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { reviews, isLoading, error } = useBookReviews(book?.id);
  const { submitReview } = useSubmitReviews(book?.id);
  const [showModal, setShowModal] = useState(null);

  if (isLoading) return <ReviewsSectionSkeleton />;

  const stats = calculateReviewStats(reviews);

  const userHasReviewed = reviews?.some((r) => r.user_id === user?.id);

  const handleWriteClick = () => {
    if (!user) {
      setShowModal('login');
    } else if (userHasReviewed) {
      toast.error('You have already submitted a review.');
    } else {
      setShowModal('write');
    }
  };

  const triggerLogin = () => {
    navigate('/login');
  };

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;

  return (
    <ReviewsContainer aria-labelledby='reviews-header'>
      <TopRow>
        <LeftColumn>
          <HeaderTitle id='reviews-header'>
            User Reviews ({reviews.length})
          </HeaderTitle>

          <CharacteristicsColumn>
            <CharacteristicRow>
              <span>Writing Quality</span>
              <StarRating
                size={27}
                interactive={false}
                rating={stats.avgWritingQuality}
              />
            </CharacteristicRow>

            <CharacteristicRow>
              <span>Plot Development</span>
              <StarRating
                size={27}
                interactive={false}
                rating={stats.avgWritingQuality} //
              />
            </CharacteristicRow>

            <CharacteristicRow>
              <span>World Building</span>
              <StarRating
                size={27}
                interactive={false}
                rating={stats.avgWritingQuality}
              />
            </CharacteristicRow>
          </CharacteristicsColumn>

          <RatingDistribution
            key={stats.reviewCount}
            average={stats.avgRating}
            totalVotes={stats.reviewCount}
            breakdown={stats.breakdown}
          />
        </LeftColumn>

        <RightColumn>
          <WriteReviewSection>
            <strong>Share your honest thoughts</strong>
            {!userHasReviewed ? (
              <WriteButton onClick={handleWriteClick}>
                Write a Review
              </WriteButton>
            ) : (
              <Reviewed> Reviewed </Reviewed>
            )}
          </WriteReviewSection>
        </RightColumn>
      </TopRow>

      <MoreReviewsLink
        onClick={() => navigate(`/books/${book?.slug}/reviews`)}
        role='button'
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === 'Enter' && navigate(`/books/${book?.slug}/reviews`)
        }
      >
        More Reviews
      </MoreReviewsLink>

      {showModal === 'write' && (
        <WriteReviewModal
          onClose={() => setShowModal(null)}
          onSubmit={submitReview}
          bookId={book?.id}
          userId={user?.id}
        />
      )}

      {showModal === 'login' && (
        <LoginPromptModal
          onClose={() => setShowModal(null)}
          onLogin={triggerLogin}
        />
      )}
    </ReviewsContainer>
  );
}
