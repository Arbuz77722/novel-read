import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import styled from 'styled-components';

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  overflow: hidden;
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
  return (
    <StyledProfileLayout>
      <ProfileSidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledProfileLayout>
  );
}

export default ProfileLayout;
