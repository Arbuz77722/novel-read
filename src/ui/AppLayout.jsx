import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { max_width } from '../utils/constants';

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-grey-0);
  margin: 0;
  padding: 0;
`;

const MainContainer = styled.div`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 0 4.8rem;
`;

function AppLayout() {
  return (
    <AppWrapper>
      <Header />
      <MainContainer>
        <main>
          <Outlet />
        </main>
      </MainContainer>
      <Footer />
    </AppWrapper>
  );
}

export default AppLayout;
