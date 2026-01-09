import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const SubTabs = styled.nav`
  display: flex;
  gap: 3.2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

function LibrarySubTabsSkeleton({ tabCount = 6 }) {
  return (
    <SubTabs>
      {Array(tabCount)
        .fill()
        .map((_, i) => (
          <Skeleton key={i} width={80 + Math.random() * 40} height={24} />
        ))}
    </SubTabs>
  );
}

export default LibrarySubTabsSkeleton;
