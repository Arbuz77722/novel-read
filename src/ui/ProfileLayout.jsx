import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import ProfileSidebar from './ProfileSidebar';
import ProfileSidebarToggle from './ProfileSideBarToggle';

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: calc(100vh - var(--header-height));
  overflow: hidden;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const SidebarWrapper = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  position: relative;

  @media (max-width: 1024px) {
    position: fixed;
    top: var(--header-height);
    right: 0;
    width: 26rem;
    height: calc(100vh - var(--header-height));
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 20;

    &[data-open='true'] {
      transform: translateX(0);
    }
  }
`;

const Main = styled.main`
  padding: 3.2rem 4.8rem;
  overflow-y: auto;
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
  max-width: 96rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function ProfileLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <ProfileSidebarToggle
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />

      <StyledProfileLayout>
        <SidebarWrapper data-open={isSidebarOpen}>
          <ProfileSidebar />
        </SidebarWrapper>

        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledProfileLayout>
    </>
  );
}

export default ProfileLayout;
