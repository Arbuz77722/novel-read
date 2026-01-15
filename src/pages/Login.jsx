import styled from 'styled-components';

import Heading from '../ui/Heading';
import LoginForm from '../features/authentication/LoginForm';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 48rem;
  display: grid;
  gap: 2rem;

  @media (min-width: 640px) {
    padding: 4rem;
  }
`;

const FooterText = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);

  & a {
    color: var(--color-brand-600);
    text-decoration: none;
    font-weight: 500;
  }
`;

function Login() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  if (user) return <Navigate to='/' replace />;

  return (
    <PageWrapper>
      <Card>
        <Heading as='h4'>Login to your account</Heading>
        <LoginForm />
        <FooterText>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </FooterText>
        <FooterText>
          Forget password? <Link to='/forgot-password'>Forgot password</Link>
        </FooterText>
      </Card>
    </PageWrapper>
  );
}

export default Login;
