import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import LoginNavigation from './LoginNavigation';
import { max_width } from '../utils/constants';
import LoggedInUser from './LoggedInUser';
import { useUser } from '../features/authentication/useUser';

const StyledHeader = styled.header`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 2rem 4.8rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const FullWidthBorder = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

function Header() {
  const { user, isAuthenticated } = useUser();

  return (
    <StyledHeader>
      <LeftGroup>
        <Logo />
        <HeaderMenu />
      </LeftGroup>
      <FlexColumn>
        {isAuthenticated && user ? <LoggedInUser /> : null}
        <LoginNavigation isAuthenticated={isAuthenticated} />
      </FlexColumn>
      <FullWidthBorder />
    </StyledHeader>
  );
}

export default Header;
