import styled, { css } from 'styled-components';

const Form = styled.form`
  ${({ type = 'regular' }) =>
    type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      display: grid;
      gap: 1.6rem; // spacing between rows
      width: 100%; // allow full width of parent
    `}

  ${({ type = 'regular' }) =>
    type === 'modal' &&
    css`
      width: 80rem;
    `}

   
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
