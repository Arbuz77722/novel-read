import { useState } from 'react';
import styled from 'styled-components';
import useForgotPassword from './useForgotPassword';
import SpinnerMini from '../../ui/SpinnerMini';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
`;

const Card = styled.div`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 40rem;
  display: grid;
  gap: 2rem;
`;

const Message = styled.p`
  font-size: 1.4rem;
  color: ${({ error }) => (error ? 'red' : 'green')};
`;

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { sendResetEmail, isPending } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    sendResetEmail(email);
  }

  return (
    <PageWrapper>
      <Card>
        <h2>Forgot Password</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit'>
            {isPending ? <SpinnerMini /> : 'Send Reset Link'}
          </Button>
        </Form>
      </Card>
    </PageWrapper>
  );
}
