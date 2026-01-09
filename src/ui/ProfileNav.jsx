import styled from 'styled-components';
import StyledNavLink from './StyledNavLink';
import { Edit, InboxIcon, Library, Settings, User2 } from 'lucide-react';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1.4rem;
`;

const NavItem = styled.li`
  list-style: none;
`;

function ProfileNav() {
  const navItems = [
    { to: 'overview', name: 'Overview', icon: User2 },
    { to: 'edit', name: 'Edit Profile', icon: Edit },
    { to: 'library', name: 'Library', icon: Library },
    { to: 'inbox', name: 'Inbox', icon: InboxIcon },
    { to: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <NavList>
      {navItems.map((navItem) => {
        const Icon = navItem.icon;
        return (
          <NavItem key={navItem.to}>
            <StyledNavLink to={navItem.to}>
              <Icon size={20} />
              <span>{navItem.name}</span>
            </StyledNavLink>
          </NavItem>
        );
      })}
    </NavList>
  );
}

export default ProfileNav;
