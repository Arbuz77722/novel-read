import styled from 'styled-components';
import SignUpForm from '../features/authentication/SignUpForm';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 100%;
  @media (min-width: 640px) {
    padding: 4rem;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 0.8rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-bottom: 2.4rem;
  text-align: center;
`;

const FooterText = styled.p`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  & a {
    color: var(--color-brand-600);
    text-decoration: none;
    font-weight: 500;
  }
`;

function SignUp() {
  return (
    <PageWrapper>
      <Card>
        <Title>Sign Up</Title>
        <Subtitle>Create your account to explore Isekai Haven</Subtitle>
        <SignUpForm />
        <FooterText>
          Already have an account? <Link to='/login'>Login</Link>
        </FooterText>
      </Card>
    </PageWrapper>
  );
}

export default SignUp;
