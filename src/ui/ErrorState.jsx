import styled from 'styled-components';

const StyledErrorState = styled.div`
  padding: 2rem;
  text-align: center;
`;

function ErrorState({ title, message }) {
  return (
    <StyledErrorState>
      <h2>{title}</h2>
      <p>{message}</p>
    </StyledErrorState>
  );
}

export default ErrorState;
