import styled from 'styled-components';

const StyledItemActive = styled.li`
  padding: 0.5rem 1rem;
  background-color: ${({ active }) =>
    active ? 'var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${({ active }) =>
    active ? 'var(--color-brand-50)' : 'var(--color-grey-900)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-brand-900);
    color: var(--color-brand-500);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default StyledItemActive;
