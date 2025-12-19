import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';
import StyledNavLink from './StyledNavLink';
import Logout from '../features/authentication/Logout';

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
            <StyledNavLink to='/profile'>Profile</StyledNavLink>
          </li>
          {/* <li>
            <StyledNavLink to='/profile/library'>Library</StyledNavLink>
          </li> */}
          <li>
            <StyledNavLink>
              <Logout />
            </StyledNavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <StyledNavLink to='/signup'>Sign up</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to='/login'>Login</StyledNavLink>
          </li>
        </>
      )}
    </StyledLoginNav>
  );
}

export default LoginNavigation;
