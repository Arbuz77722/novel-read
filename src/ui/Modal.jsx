import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Content = styled.div`
  background: var(--color-grey-0);
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

function Modal({ title, onClose, children }) {
  return (
    <Backdrop onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        {children}
      </Content>
    </Backdrop>
  );
}

export default Modal;
