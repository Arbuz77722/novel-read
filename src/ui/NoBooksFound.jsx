import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  place-content: center;
  margin: auto;
  padding: 5rem;

  p {
    color: var(--color-brand-500);
    font-size: 2rem;
    font-weight: bold;
  }
`;

function NoBooksFound() {
  return (
    <StyledDiv>
      <p>No match found for the selected genre.</p>
    </StyledDiv>
  );
}

export default NoBooksFound;
