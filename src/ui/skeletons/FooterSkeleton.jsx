import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { max_width } from '../utils/constants';

const StyledFooterSkeleton = styled.div`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 4rem 4.8rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4rem;
`;

const FullWidthBorder = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
  width: 100vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const LogoSkeleton = styled.div`
  width: 160px;
  height: 40px;
`;

function FooterSkeleton() {
  return (
    <div style={{ position: 'relative' }}>
      <FullWidthBorder />
      <StyledFooterSkeleton>
        {/* Column 1: Logo + copyright */}
        <Column>
          <LogoSkeleton>
            <Skeleton height={40} width={160} />
          </LogoSkeleton>
          <Skeleton width={200} height={14} />
        </Column>

        {/* Column 2: Navigation */}
        <Column>
          <Skeleton
            width={100}
            height={20}
            style={{ marginBottom: '1.6rem' }}
          />
          {Array(4)
            .fill()
            .map((_, i) => (
              <Skeleton key={i} width={140} height={16} />
            ))}
        </Column>

        {/* Column 3: Genres */}
        <Column>
          <Skeleton width={80} height={20} style={{ marginBottom: '1.6rem' }} />
          {Array(4)
            .fill()
            .map((_, i) => (
              <Skeleton key={i} width={120} height={16} />
            ))}
        </Column>

        {/* Column 4: More Genres */}
        <Column>
          <Skeleton
            width={110}
            height={20}
            style={{ marginBottom: '1.6rem' }}
          />
          {Array(4)
            .fill()
            .map((_, i) => (
              <Skeleton key={i} width={150} height={16} />
            ))}
        </Column>

        {/* Column 5: Legal */}
        <Column>
          <Skeleton width={90} height={20} style={{ marginBottom: '1.6rem' }} />
          {Array(4)
            .fill()
            .map((_, i) => (
              <Skeleton key={i} width={130} height={16} />
            ))}
        </Column>
      </StyledFooterSkeleton>
    </div>
  );
}

export default FooterSkeleton;
