import styled from 'styled-components';
import ResetPasswordForm from '../features/authentication/ResetPasswordForm';

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
`;

function ResetPassword() {
  return (
    <PageWrapper>
      <Card>
        <h4>Set a new password</h4>
        <ResetPasswordForm />
      </Card>
    </PageWrapper>
  );
}

export default ResetPassword;
