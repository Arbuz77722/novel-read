import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);

  padding: 0.8rem 1.2rem;
  min-height: 3.6rem;

  font-size: 1.4rem;
  color: var(--color-grey-700);

  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.15);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    cursor: not-allowed;
  }
`;

export default Input;
