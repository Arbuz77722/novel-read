import styled from 'styled-components';
import FilterReviews from '../../ui/FilterReviews';
import useBrowseParams from '../../hooks/useBrowseParams';

const StyledFilter = styled.div`
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const ReviewStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 2rem;
`;
const ReviewCount = styled.span`
  font-weight: bold;
`;

const ReviewTitle = styled.h3``;

function ReviewFilter({ reviews }) {
  const { setReviewsFilter, selectedReviewsFilter } = useBrowseParams();

  return (
    <StyledFilter>
      <ReviewStats>
        <ReviewTitle>User Reviews</ReviewTitle>
        <ReviewCount>({reviews.length})</ReviewCount>
      </ReviewStats>
      <FilterReviews
        active={selectedReviewsFilter}
        onChange={setReviewsFilter}
      />
    </StyledFilter>
  );
}

export default ReviewFilter;
