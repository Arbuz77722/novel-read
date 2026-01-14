import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SubTabs = styled.nav`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SubTab = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-grey-200);
  }

  &.active {
    background-color: var(--color-brand-600);
    color: var(--color-grey-700);
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
