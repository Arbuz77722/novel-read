import styled from 'styled-components';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import LoginForm from '../features/authentication/LoginForm';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 4rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 48rem;
  display: grid;
  gap: 2rem;
`;

const FooterText = styled.p`
  margin-top: 1.6rem;
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
        <Logo />
        <Heading as='h4'>Login to your account</Heading>
        <LoginForm />
        <FooterText>
          Don't have an account? <Link to='/signup'>Sign up</Link>
        </FooterText>
      </Card>
    </PageWrapper>
  );
}

export default Login;
