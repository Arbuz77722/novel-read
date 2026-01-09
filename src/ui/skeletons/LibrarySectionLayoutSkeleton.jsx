import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const MainTabs = styled.nav`
  display: flex;
  gap: 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 0 0 1.6rem 0;
  margin-bottom: 3.2rem;
`;

function LibrarySectionLayoutSkeleton() {
  return (
    <div>
      <MainTabs>
        {Array(3)
          .fill()
          .map((_, i) => (
            <Skeleton key={i} width={100} height={32} />
          ))}
      </MainTabs>

      <div style={{ height: '400px' }}>
        <Skeleton height='100%' />
      </div>
    </div>
  );
}

export default LibrarySectionLayoutSkeleton;
