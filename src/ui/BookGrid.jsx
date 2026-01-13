import styled, { css } from 'styled-components';
const BookGrid = styled.ul`
  display: grid;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

  ${({ variant }) =>
    variant === 'ongoing' &&
    css`
      @media (min-width: 600px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    `}

  ${({ variant }) =>
    variant === 'ranking' &&
    css`
      grid-template-columns: 1fr;
    `}

  ${({ variant }) =>
    variant === 'updates' &&
    css`
      grid-template-columns: 1fr;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `}
`;

export default BookGrid;
