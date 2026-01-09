import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledSection = styled.div`
  margin-bottom: 2rem;
`;

const StyledHeadingSkeleton = styled.div`
  margin-bottom: 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StyledItemSkeleton = styled.div`
  padding: 0.8rem 1.4rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  min-width: 80px;
`;

function FilterSectionSkeleton({ title, optionCount = 8, showHeading = true }) {
  return (
    <StyledSection>
      {showHeading && (
        <StyledHeadingSkeleton>
          <Skeleton width={150} height={24} />
        </StyledHeadingSkeleton>
      )}
      <StyledContainer>
        {Array(optionCount)
          .fill()
          .map((_, i) => (
            <StyledItemSkeleton key={i}>
              <Skeleton width={Math.random() * 60 + 60} height={20} />
            </StyledItemSkeleton>
          ))}
      </StyledContainer>
    </StyledSection>
  );
}

export default FilterSectionSkeleton;
