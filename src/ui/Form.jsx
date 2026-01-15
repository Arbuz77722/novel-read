import styled, { css } from 'styled-components';

const Form = styled.form`
  ${({ type = 'regular' }) =>
    type === 'regular' &&
    css`
      background-color: var(--color-grey-0);
      display: grid;
      gap: 1.6rem;
      width: 100%;
      justify-content: center;
      @media (min-width: 640px) {
        padding: 2.4rem 4rem;
      }
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
