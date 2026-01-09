import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledSkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--color-grey-0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 220px;
`;

const ContentSkeleton = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
`;

function BookCardSkeleton() {
  return (
    <StyledSkeletonCard>
      <ImageSkeleton>
        <Skeleton height='100%' />
      </ImageSkeleton>
      <ContentSkeleton>
        <Skeleton width='85%' height={24} />
        <Skeleton width='60%' height={18} />
        <FooterSkeleton>
          <Skeleton circle width={18} height={18} />
          <Skeleton width={80} height={16} />
        </FooterSkeleton>
      </ContentSkeleton>
    </StyledSkeletonCard>
  );
}

export default BookCardSkeleton;
