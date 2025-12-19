import * as Progress from '@radix-ui/react-progress';
import styled from 'styled-components';

const ProgressRoot = styled(Progress.Root)`
  position: relative;
  overflow: hidden;
  background: var(--color-grey-200);
  border-radius: 6px;
  height: 15px;
  width: 100%;
`;

const ProgressIndicator = styled(Progress.Indicator)`
  background: var(--color-brand-600);
  height: 100%;
  transition: transform 300ms ease;
`;

const ProgressLabel = styled.span`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: 500;
  color: white;
`;

function ProgressBar({ value }) {
  return (
    <ProgressRoot value={value}>
      <ProgressIndicator
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
      <ProgressLabel>{value}%</ProgressLabel>
    </ProgressRoot>
  );
}

export default ProgressBar;
