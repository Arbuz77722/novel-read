import styled from 'styled-components';
const StyledLogo = styled.div`
  display: flex;
  gap: 2rem;
`;

function Logo() {
  return (
    <StyledLogo>
      <p>Isekai Haven</p>
    </StyledLogo>
  );
}

export default Logo;
