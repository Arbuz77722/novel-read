import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SidebarToggle = styled.button`
  position: fixed;
  top: calc(var(--header-height) + 1.6rem);
  right: 1.6rem;

  width: 3.6rem;
  height: 3.6rem;

  border-radius: 50%;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 30;

  @media (min-width: 1025px) {
    display: none;
  }
`;

function ProfileSidebarToggle({ isOpen, onToggle }) {
  return (
    <SidebarToggle onClick={onToggle}>
      {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </SidebarToggle>
  );
}

export default ProfileSidebarToggle;
