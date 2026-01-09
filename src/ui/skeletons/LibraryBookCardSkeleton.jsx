import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledCard = styled.li`
  padding: 1.2rem;
  border-radius: 12px;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-sm);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.6rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CoverSkeleton = styled.div`
  width: 8rem;
  height: 10rem;
  border-radius: 8px;
`;

const ButtonSkeleton = styled.div`
  width: 100%;
  height: 3.2rem;
  border-radius: 6px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ProgressSectionSkeleton = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const BottomRowSkeleton = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`;

function LibraryBookCardSkeleton() {
  return (
    <StyledCard>
      <Layout>
        <LeftColumn>
          <CoverSkeleton>
            <Skeleton height='100%' />
          </CoverSkeleton>
          <ButtonSkeleton>
            <Skeleton height='100%' />
          </ButtonSkeleton>
        </LeftColumn>

        <RightColumn>
          <Skeleton width='70%' height={20} />
          <Skeleton width='50%' height={16} />
          <ProgressSectionSkeleton>
            <Skeleton width='60%' height={16} />
            <Skeleton height={8} />
          </ProgressSectionSkeleton>
          <BottomRowSkeleton>
            <Skeleton width={120} height={40} borderRadius={6} />
          </BottomRowSkeleton>
        </RightColumn>
      </Layout>
    </StyledCard>
  );
}

export default LibraryBookCardSkeleton;
