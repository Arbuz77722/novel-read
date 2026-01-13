import { NavLink, Outlet, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const MainTabs = styled.nav`
  display: flex;
  gap: 4rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 0 0 1.6rem 0;
  margin-bottom: 3.2rem;
`;

const MainTab = styled(NavLink)`
  font-size: 1.5rem;
  padding-bottom: 0.7rem;

  font-weight: 600;
  color: var(--color-grey-600);

  border-bottom: 3px solid transparent;
  transition: all 0.2s;

  &.active {
    color: var(--color-brand-600);
    border-bottom-color: var(--color-brand-600);
  }

  @media (min-width: 468px) {
    font-size: 2rem;
    padding-bottom: 1.2rem;
  }
`;

function LibrarySectionLayout() {
  const isLibraryWildcard = useMatch('/profile/library/*');
  const isUpdates = useMatch('/profile/library/updates/*');
  const isHistory = useMatch('/profile/library/history');
  const isLibraryActive = isLibraryWildcard && !isUpdates && !isHistory;

  return (
    <div>
      <MainTabs>
        <MainTab to='.' className={isLibraryActive ? 'active' : ''} end>
          Library
        </MainTab>

        <MainTab to='updates' className={isUpdates ? 'active' : ''}>
          Updates
        </MainTab>

        <MainTab to='history' className={isHistory ? 'active' : ''}>
          History
        </MainTab>
      </MainTabs>

      <Outlet />
    </div>
  );
}

export default LibrarySectionLayout;
