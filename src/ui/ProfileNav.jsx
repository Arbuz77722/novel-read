import styled from 'styled-components';
import StyledNavLink from './StyledNavLink';

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
    { to: 'overview', name: 'Overview' },
    { to: 'edit', name: 'Edit Profile' },
    { to: 'library', name: 'Library' },
    { to: 'notifications', name: 'Notifications' },
    { to: 'settings', name: 'Settings' },
  ];

  return (
    <NavList>
      {navItems.map((navItem) => (
        <NavItem key={navItem.to}>
          <StyledNavLink to={navItem.to}>
            <span>{navItem.name}</span>
          </StyledNavLink>
        </NavItem>
      ))}
    </NavList>
  );
}

export default ProfileNav;
