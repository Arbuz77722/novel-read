import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import LoggedInUser from './LoggedInUser';
import StyledNavLink from './StyledNavLink';
import { UserIcon, ChevronDown } from 'lucide-react';
import Logout from '../features/authentication/Logout';
import UserDropdownHeader from './UserDropdownHeader.jsx';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Chevron = styled(ChevronDown)`
  transition: transform 0.2s;
  ${({ $open }) => $open && 'transform: rotate(180deg);'}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 260px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
`;

const UserHeader = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-200);
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownLink = styled(StyledNavLink)`
  padding: 1.25rem 1.8rem;
  border-radius: 0;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.active {
    background: none;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-200);
  margin: 0;
`;

const LogoutItem = styled.div`
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  color: var(--color-red-700);
`;

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggle = () => setIsOpen((o) => !o);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <DropdownWrapper ref={wrapperRef}>
      <DropdownTrigger onClick={toggle}>
        <LoggedInUser />
        <Chevron size={18} $open={isOpen} />
      </DropdownTrigger>

      {isOpen && (
        <DropdownMenu>
          <UserHeader>
            <UserDropdownHeader />
          </UserHeader>

          <MenuList>
            <DropdownLink to='/profile/overview'>
              <UserIcon size={18} />
              Profile
            </DropdownLink>

            <Divider />

            <LogoutItem>
              <Logout />
            </LogoutItem>
          </MenuList>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}

export default UserDropdown;
