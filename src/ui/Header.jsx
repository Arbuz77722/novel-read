import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import LoginNavigation from './LoginNavigation';
import { max_width } from '../utils/constants';
import LoggedInUser from './LoggedInUser';
import { useUser } from '../features/authentication/useUser';
import UserSkeleton from './skeletons/UserSkeleton';
import UserDropdown from './UserDropdown';

const StyledHeader = styled.header`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 1.6rem;

  position: relative;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  margin-left: auto;
`;
const BottomRow = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
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

const RightGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

function Header() {
  const { user, isAuthenticated, isPending } = useUser();

  return (
    <StyledHeader>
      <Row>
        <TopRow>
          {isPending ? (
            <UserSkeleton />
          ) : isAuthenticated && user ? (
            <UserDropdown />
          ) : null}
        </TopRow>
        <BottomRow>
          <LeftGroup>
            <Logo />
            <HeaderMenu />
          </LeftGroup>
          <RightGroup>
            <LoginNavigation isAuthenticated={isAuthenticated} />
          </RightGroup>
        </BottomRow>
      </Row>
      <FullWidthBorder />
    </StyledHeader>
  );
}

export default Header;
