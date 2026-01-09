import styled from 'styled-components';

const SwitchLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  gap: 1rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const SwitchTrack = styled.span`
  width: 44px;
  height: 24px;
  background-color: ${({ checked }) =>
    checked ? 'var(--color-brand-600)' : 'var(--color-grey-300)'};
  border-radius: 999px;
  position: relative;
  transition: background-color 0.25s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const SwitchThumb = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ checked }) => (checked ? '22px' : '3px')};
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

const SwitchText = styled.span`
  font-size: 1.6rem;
  color: var(--color-grey-700);
`;

function Checkbox({ checked, onChange, disabled = false, id, label }) {
  return (
    <SwitchLabel disabled={disabled}>
      {label && <SwitchText>{label}</SwitchText>}
      <HiddenCheckbox
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <SwitchTrack checked={checked} disabled={disabled}>
        <SwitchThumb checked={checked} />
      </SwitchTrack>
    </SwitchLabel>
  );
}

export default Checkbox;
