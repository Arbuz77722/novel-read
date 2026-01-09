import Modal from './Modal';
import Button from './Button';

export default function LoginPromptModal({ onClose, onLogin }) {
  return (
    <Modal title='Login Required' onClose={onClose}>
      <p style={{ fontSize: '1.5rem' }}>You need to login to continue.</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onLogin}>Login</Button>
      </div>
    </Modal>
  );
}
