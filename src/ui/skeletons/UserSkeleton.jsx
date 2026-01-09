import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function UserSkeleton() {
  return (
    <SkeletonWrapper>
      <Skeleton circle width={40} height={40} /> {/* Avatar */}
      <div>
        <Skeleton width={120} height={16} /> {/* Username */}
        <Skeleton width={80} height={12} style={{ marginTop: '0.5rem' }} />{' '}
        {/* Email or role */}
      </div>
    </SkeletonWrapper>
  );
}

export default UserSkeleton;
