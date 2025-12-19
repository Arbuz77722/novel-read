import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { useEffect } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes() {
  const { isAuthenticated, isPending } = useUser();

  // Show spinner while checking auth
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // If not authenticated → redirect to login (declarative!)
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // If authenticated → render ALL protected child routes
  return <Outlet />;
}

export default ProtectedRoutes;
