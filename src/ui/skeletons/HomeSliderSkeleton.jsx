import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const SlidesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 0 40px;
  overflow: visible;
`;

const SkeletonCard = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
`;

const OverlaySkeleton = styled.div`
  position: absolute;
  inset: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopRowSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

function HomeSliderSkeleton() {
  return (
    <SliderWrapper>
      <SlidesContainer>
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i}>
            <Skeleton height='100%' />

            <OverlaySkeleton>
              <TopRowSkeleton>
                <Skeleton width={80} height={24} borderRadius={12} />
                <Skeleton width={40} height={32} borderRadius={8} />
              </TopRowSkeleton>

              <BottomInfoSkeleton>
                <Skeleton width='80%' height={28} />
                <Skeleton width='60%' height={20} />
                <Skeleton width={100} height={20} />
              </BottomInfoSkeleton>
            </OverlaySkeleton>
          </SkeletonCard>
        ))}
      </SlidesContainer>

      {/* Fake pagination */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Skeleton width={120} height={10} inline style={{ margin: '0 8px' }} />
        <Skeleton
          circle
          width={10}
          height={10}
          count={3}
          inline
          style={{ margin: '0 8px' }}
        />
      </div>
    </SliderWrapper>
  );
}

export default HomeSliderSkeleton;
