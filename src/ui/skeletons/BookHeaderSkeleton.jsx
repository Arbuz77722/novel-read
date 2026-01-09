import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const BookHeaderContainer = styled.div`
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px 12px 0 0;
  border-bottom: 3px solid var(--color-brand-700);
  width: 100%;
  box-sizing: border-box;
`;

const BookHeaderFlex = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
`;

const CoverColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 1.5rem;
  min-width: 260px;
`;

const BookCoverSkeleton = styled.div`
  width: 260px;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
`;

const MetadataListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.5rem;
`;

const MetadataItemSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const BookTitleSkeleton = styled.div`
  height: 48px;
  margin-bottom: 1.2rem;
`;

const SectionTitleSkeleton = styled.div`
  height: 32px;
  margin: 1.5rem 0 0.8rem;
`;

const BookDescriptionSkeleton = styled.div`
  height: 120px;
  margin-bottom: 2rem;
`;

const TagContainerSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 0.8rem;
`;

const BottomRowSkeleton = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function BookHeaderSkeleton() {
  return (
    <BookHeaderContainer>
      <BookHeaderFlex>
        <CoverColumn>
          <BookCoverSkeleton>
            <Skeleton height='100%' />
          </BookCoverSkeleton>
          <MetadataListSkeleton>
            {Array(3)
              .fill()
              .map((_, i) => (
                <MetadataItemSkeleton key={i}>
                  <Skeleton width={80} height={18} />
                  <Skeleton width={120} height={16} />
                </MetadataItemSkeleton>
              ))}
          </MetadataListSkeleton>
        </CoverColumn>

        <ContentColumn>
          <BookTitleSkeleton>
            <Skeleton width='100%' height='48px' />
          </BookTitleSkeleton>

          <SectionTitleSkeleton>
            <Skeleton width={120} height={32} />
          </SectionTitleSkeleton>

          <BookDescriptionSkeleton>
            <Skeleton count={4} height={20} />
          </BookDescriptionSkeleton>

          <MetadataListSkeleton>
            <MetadataItemSkeleton>
              <Skeleton width={60} height={18} />
              <Skeleton width={200} height={16} />
            </MetadataItemSkeleton>
          </MetadataListSkeleton>

          <TagContainerSkeleton>
            <Skeleton width='100%' height={16} />
            <Skeleton width='80%' height={16} />
            <Skeleton width='60%' height={16} />
          </TagContainerSkeleton>

          <BottomRowSkeleton>
            <Skeleton width={140} height={48} borderRadius={10} />
            <Skeleton width={180} height={48} borderRadius={10} />
          </BottomRowSkeleton>
        </ContentColumn>
      </BookHeaderFlex>
    </BookHeaderContainer>
  );
}

export default BookHeaderSkeleton;
