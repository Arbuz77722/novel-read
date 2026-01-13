import { Outlet } from 'react-router-dom';
import LibrarySubTabs from './LibrarySubTabs';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2.4rem;
`;
const Main = styled.div`
  margin-top: 4rem;
`;

function LibraryStatusLayout() {
  return (
    <Container>
      <LibrarySubTabs />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

export default LibraryStatusLayout;
