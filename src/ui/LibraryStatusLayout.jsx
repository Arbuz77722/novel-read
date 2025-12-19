import { Outlet } from 'react-router-dom';
import LibrarySubTabs from './LibrarySubTabs';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2.4rem;
`;

function LibraryStatusLayout() {
  return (
    <Container>
      <LibrarySubTabs />
      <div style={{ marginTop: '4rem' }}>
        <Outlet />
      </div>
    </Container>
  );
}

export default LibraryStatusLayout;
