import styled from 'styled-components';

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  color: var(--color-grey-700);
  cursor: pointer;

  input[type='checkbox'] {
    height: 1.8rem;
    width: 1.8rem;
    accent-color: var(--color-brand-600);
    cursor: pointer;
  }

  input[type='checkbox']:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox htmlFor={!disabled ? id : undefined}>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </StyledCheckbox>
  );
}

export default Checkbox;
