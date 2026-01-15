import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import LoginNavigation from './LoginNavigation';
import MobileSidebarMenu from './MobileSidebarMenu';
import UserDropdown from './UserDropdown';
import ButtonIcon from './ButtonIcon';
import { Menu } from 'lucide-react';
import { useUser } from '../features/authentication/useUser';
import UserSkeleton from './skeletons/UserSkeleton';
import { max_width } from '../utils/constants';
import NotificationDropdown from '../features/notifications/NotificationDropdown';
import { useLocation } from 'react-router-dom';

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
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  @media (min-width: 768px) {
    gap: 2.4rem;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const HeaderMenuWrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const HamburgerWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const FullWidthBorder = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const MobileRightGroup = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { user, isAuthenticated, isPending } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <StyledHeader>
      <Row>
        <TopRow>
          {isPending ? (
            <UserSkeleton />
          ) : isAuthenticated && user ? (
            <>
              <UserDropdown />
            </>
          ) : null}
        </TopRow>

        <BottomRow>
          <LeftGroup>
            <Logo />
            <HeaderMenuWrapper>
              <HeaderMenu />
            </HeaderMenuWrapper>
          </LeftGroup>

          <RightGroup>
            <LoginNavigation
              isPending={isPending}
              user={user}
              isAuthenticated={isAuthenticated}
            />
          </RightGroup>

          <HamburgerWrapper>
            {isAuthenticated ? (
              <MobileRightGroup>
                <NotificationDropdown />
              </MobileRightGroup>
            ) : null}
            <ButtonIcon onClick={() => setMenuOpen(true)}>
              <Menu size={22} />
            </ButtonIcon>
          </HamburgerWrapper>
        </BottomRow>
      </Row>

      <FullWidthBorder />

      <MobileSidebarMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </StyledHeader>
  );
}
