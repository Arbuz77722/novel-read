import { useState } from 'react';
import Modal from '../../ui/Modal';
import StarRating from '../../ui/StarRating';
import Checkbox from '../../ui/CheckBox';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { useSubmitReviews } from './useSubmitReviews';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const RatingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-800);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-200);
  margin: 1rem 0;
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  min-height: 160px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-brand-100);
  font-size: 1.5rem;
  line-height: 1.6;
  resize: vertical;
  color: var(--color-grey-200);
`;

const CheckboxWrapper = styled.div`
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function WriteReviewModal({ onClose, bookId, userId }) {
  const [writingQuality, setWritingQuality] = useState(0);
  const [plotDevelopment, setPlotDevelopment] = useState(0);
  const [worldBuilding, setWorldBuilding] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);

  const { submitReview, isPending } = useSubmitReviews(bookId);

  const handleSubmit = () => {
    const avgRating = (writingQuality + plotDevelopment + worldBuilding) / 3;

    const reviewData = {
      bookId,
      userId,
      review: reviewText,
      rating: avgRating,
      writing_quality: writingQuality,
      plot_development: plotDevelopment,
      world_building: worldBuilding,
      isSpoiler,
    };

    submitReview(reviewData);
    onClose();
  };

  return (
    <Modal title='Write a Review' onClose={onClose}>
      <Container>
        <RatingRow>
          <Label>Writing Quality</Label>
          <StarRating size={25} interactive onSetRating={setWritingQuality} />
        </RatingRow>

        <RatingRow>
          <Label>Plot Development</Label>
          <StarRating size={25} interactive onSetRating={setPlotDevelopment} />
        </RatingRow>

        <RatingRow>
          <Label>World Building</Label>
          <StarRating size={25} interactive onSetRating={setWorldBuilding} />
        </RatingRow>

        <Divider />

        <ReviewSection>
          <Label>Your Review</Label>
          <ReviewTextArea
            placeholder='Write your review...'
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </ReviewSection>

        <CheckboxWrapper>
          <Checkbox
            checked={isSpoiler}
            onChange={() => setIsSpoiler(!isSpoiler)}
          >
            Mark as spoiler
          </Checkbox>
        </CheckboxWrapper>

        <ButtonGroup>
          <Button variation='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Post Review'}
          </Button>
        </ButtonGroup>
      </Container>
    </Modal>
  );
}
