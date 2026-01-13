import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { LogIn, LogInIcon, User2Icon, XIcon } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import NotificationDropdown from '../features/notifications/NotificationDropdown';
import SearchBox from '../features/search/SearchBox';
import StyledNavLink from './StyledNavLink';
import { Home, Compass, Library } from 'lucide-react';
import { useUser } from '../features/authentication/useUser';

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 900;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: var(--color-grey-0);
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);
  transform: translateX(${({ open }) => (open ? '0' : '-100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  z-index: 1000;
  overflow-y: auto;
`;

const CloseButton = styled(ButtonIcon)`
  align-self: flex-end;
  margin-bottom: 2rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MenuItemWrapper = styled.div`
  cursor: pointer;
`;

export default function MobileSidebarMenu({ open, onClose }) {
  const { isAuthenticated } = useUser();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  return (
    <>
      <SidebarOverlay open={open} />
      <Sidebar open={open} ref={sidebarRef}>
        <CloseButton onClick={onClose}>
          <XIcon size={20} />
        </CloseButton>
        <MenuGroup>
          <Top>
            <MenuItemWrapper>
              <StyledNavLink notActive=''>
                <SearchBox />
              </StyledNavLink>
            </MenuItemWrapper>
            <MenuItemWrapper>
              <DarkModeToggle />
            </MenuItemWrapper>
          </Top>
        </MenuGroup>

        <MenuGroup>
          <MenuItemWrapper>
            <StyledNavLink to='/' end>
              <Home size={20} /> Home
            </StyledNavLink>
          </MenuItemWrapper>
          <MenuItemWrapper>
            <StyledNavLink to='/browse'>
              <Compass size={20} /> Browse
            </StyledNavLink>
          </MenuItemWrapper>

          {isAuthenticated ? (
            <MenuItemWrapper>
              <StyledNavLink to='/profile/library'>
                <Library size={20} /> Library
              </StyledNavLink>
            </MenuItemWrapper>
          ) : (
            <>
              <MenuItemWrapper>
                <StyledNavLink to='/signup'>
                  <User2Icon size={20} /> Sign up
                </StyledNavLink>
              </MenuItemWrapper>
              <MenuItemWrapper>
                <StyledNavLink to='/login'>
                  <LogInIcon size={20} />
                  Login
                </StyledNavLink>
              </MenuItemWrapper>
            </>
          )}
        </MenuGroup>
      </Sidebar>
    </>
  );
}
