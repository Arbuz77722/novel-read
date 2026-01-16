import { Mail } from 'lucide-react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 3rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 48rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  svg {
    width: 4.8rem;
    height: 4.8rem;
    color: var(--color-brand-600);
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  color: var(--color-grey-600);
  line-height: 1.6;
`;

function CheckEmail() {
  return (
    <PageWrapper>
      <Card>
        <IconWrapper>
          <Mail />
        </IconWrapper>

        <h4>Check your email</h4>

        <Description>
          We’ve sent you a confirmation link. Please check your inbox and click
          the link to activate your account.
        </Description>

        <Description>
          If you don’t see the email, check your spam folder or try again later.
        </Description>
      </Card>
    </PageWrapper>
  );
}

export default CheckEmail;
