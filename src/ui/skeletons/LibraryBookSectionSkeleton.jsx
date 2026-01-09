import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledBookSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function LibraryBookSectionSkeleton({ itemCount = 5 }) {
  return (
    <StyledBookSection>
      {Array(itemCount)
        .fill()
        .map((_, i) => (
          <div key={i} style={{ height: '120px' }}>
            <Skeleton height='100%' borderRadius={12} />
          </div>
        ))}
    </StyledBookSection>
  );
}

export default LibraryBookSectionSkeleton;
