import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import StyledNavLink from './StyledNavLink';
import { LibraryIcon, LogInIcon } from 'lucide-react';
import NotificationDropdown from '../features/notifications/NotificationDropdown';

const StyledLoginNav = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

function LoginNavigation({ isAuthenticated }) {
  return (
    <StyledLoginNav>
      <li>
        <DarkModeToggle />
      </li>
      {isAuthenticated ? (
        <>
          <li>
            <StyledNavLink to='/profile/library'>
              <LibraryIcon size={20} />
              Library
            </StyledNavLink>
          </li>
          <li>
            <NotificationDropdown />
          </li>
        </>
      ) : (
        <>
          <li>
            <StyledNavLink to='/signup'> Sign up</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to='/login'>
              <LogInIcon size={20} />
              Login
            </StyledNavLink>
          </li>
        </>
      )}
    </StyledLoginNav>
  );
}

export default LoginNavigation;
