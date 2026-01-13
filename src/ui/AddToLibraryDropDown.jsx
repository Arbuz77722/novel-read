import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  ${({ variant }) =>
    variant === 'compact'
      ? css`
          height: 3.2rem;
          padding: 0 0.8rem;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 6px;
          background-color: var(--color-grey-200);
          color: var(--color-grey-800);

          &:hover {
            background-color: var(--color-grey-300);
          }
        `
      : css`
          height: 4.4rem;
          padding: 1.2rem;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 10px;
          background-color: var(--color-brand-600);
          color: var(--color-brand-50);
          box-shadow: var(--shadow-md);

          &:hover {
            background-color: var(--color-brand-700);
          }
        `}

  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  }
`;

const StyledOption = styled.option`
  background-color: var(--color-grey-100);
  color: var(--color-grey-800);
  font-weight: 500;
`;

function AddToLibraryDropDown({ value, onChange, variant = 'full' }) {
  return (
    <StyledSelect value={value ?? ''} onChange={onChange} variant={variant}>
      <StyledOption value='' disabled hidden>
        {variant === 'compact' ? 'Change status' : '+ Add to Library'}
      </StyledOption>

      <StyledOption value='reading'>Reading</StyledOption>
      <StyledOption value='read_later'>Read Later</StyledOption>
      <StyledOption value='hold'>On Hold</StyledOption>
      <StyledOption value='completed'>Completed</StyledOption>
      <StyledOption value='dropped'>Dropped</StyledOption>
    </StyledSelect>
  );
}

export default AddToLibraryDropDown;
