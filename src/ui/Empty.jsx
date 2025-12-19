import styled from 'styled-components';

const StyledEmpty = styled.div`
  font-size: 2rem;
  padding: 2rem;
`;

function Empty({ resourceName, children }) {
  return (
    <StyledEmpty>
      No {resourceName} could be found.{children}
    </StyledEmpty>
  );
}

export default Empty;
