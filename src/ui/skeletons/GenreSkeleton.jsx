import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledGenre = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const StyledHeadingSkeleton = styled.div`
  margin-bottom: 1rem;
`;

const GenreItemSkeleton = styled.div`
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
  min-width: 90px;
`;

function GenreSkeleton({ showHeading = true, itemCount = 20 }) {
  return (
    <>
      {showHeading && (
        <StyledHeadingSkeleton>
          <Skeleton width={180} height={28} />
        </StyledHeadingSkeleton>
      )}
      <StyledGenre>
        {/* "All" button */}
        <GenreItemSkeleton>
          <Skeleton width={60} height={20} />
        </GenreItemSkeleton>

        {/* Genre tags */}
        {Array(itemCount)
          .fill()
          .map((_, i) => (
            <GenreItemSkeleton key={i}>
              <Skeleton width={Math.random() * 50 + 70} height={20} />
            </GenreItemSkeleton>
          ))}
      </StyledGenre>
    </>
  );
}

export default GenreSkeleton;
