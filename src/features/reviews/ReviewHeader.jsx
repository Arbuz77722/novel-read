import styled from 'styled-components';
import StarRating from '../../ui/StarRating';
import { calculateReviewStats } from '../../utils/calculateReviewStats';

const StyledReviewHeader = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;
const LeftColumn = styled.div``;

const StyledImage = styled.img`
  height: 15rem;
  width: 12rem;
`;

const StyledTitle = styled.h2`
  font-size: 2.2rem;
  color: var(--color-brand-700);
`;
const StyledAuthor = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const TopRow = styled.div``;
const BottomRow = styled.div`
  display: flex;
  gap: 1rem;
  span {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const Stats = styled.div``;

function ReviewHeader({ book, reviews }) {
  const { cover_url, title, author } = book;
  const { avgRating } = calculateReviewStats(reviews);
  return (
    <StyledReviewHeader>
      <LeftColumn>
        <StyledImage src={cover_url} alt={`cover of ${title}`} />
      </LeftColumn>
      <RightColumn>
        <TopRow>
          <StyledTitle>{title}</StyledTitle>
          <StyledAuthor> Author : {author}</StyledAuthor>
        </TopRow>
        <BottomRow>
          <StarRating rating={avgRating} size={25} interactive={false} />

          <Stats></Stats>
        </BottomRow>
      </RightColumn>
    </StyledReviewHeader>
  );
}

export default ReviewHeader;
