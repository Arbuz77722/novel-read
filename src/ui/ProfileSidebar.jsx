import styled from 'styled-components';
import ProfileNav from './ProfileNav';

const SidebarContent = styled.div`
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-brand-500);
`;

function ProfileSidebar() {
  return (
    <SidebarContent>
      <SidebarTitle>My Account</SidebarTitle>
      <ProfileNav />
    </SidebarContent>
  );
}

export default ProfileSidebar;
