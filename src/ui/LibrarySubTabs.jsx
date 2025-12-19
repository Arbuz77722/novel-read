import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SubTabs = styled.nav`
  display: flex;
  gap: 3.2rem;
  flex-wrap: wrap;
`;

const SubTab = styled(NavLink)`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  padding: 0.8rem 0;

  &.active {
    color: var(--color-brand-600);
    font-weight: 600;
  }
`;

const subTabs = [
  { to: '.', end: true, label: 'All' },
  { to: 'reading', label: 'Reading' },
  { to: 'read-later', label: 'Read Later' },
  { to: 'completed', label: 'Completed' },
  { to: 'hold', label: 'On Hold' },
  { to: 'dropped', label: 'Dropped' },
];

function LibrarySubTabs() {
  return (
    <SubTabs>
      {subTabs.map((tab) => (
        <SubTab key={tab.to} to={tab.to} end={tab.end}>
          {tab.label}
        </SubTab>
      ))}
    </SubTabs>
  );
}

export default LibrarySubTabs;
