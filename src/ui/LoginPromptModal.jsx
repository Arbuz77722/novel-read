import Modal from './Modal';
import Button from './Button';
import styled from 'styled-components';

const LoginMessage = styled.p`
  font-size: 1.5rem;
`;
const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function LoginPromptModal({ onClose, onLogin }) {
  return (
    <Modal title='Login Required' onClose={onClose}>
      <LoginMessage>You need to login to continue.</LoginMessage>
      <ButtonLayout>
        <Button onClick={onLogin}>Login</Button>
      </ButtonLayout>
    </Modal>
  );
}
