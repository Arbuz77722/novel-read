import styled from 'styled-components';
import ProfileNav from './ProfileNav';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-50);
  border-left: 1px solid var(--color-grey-50);
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.03);
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-brand-500);
`;

function ProfileSidebar() {
  return (
    <StyledSidebar>
      <SidebarTitle>My Account</SidebarTitle>
      <ProfileNav />
    </StyledSidebar>
  );
}

export default ProfileSidebar;
