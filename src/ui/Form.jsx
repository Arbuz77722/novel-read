import styled, { css } from 'styled-components';

const Form = styled.form`
  ${({ type = 'regular' }) =>
    type === 'regular' &&
    css`
      padding: 2.4rem 4rem;
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      display: grid;
      gap: 1.6rem;
      width: 100%;
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
