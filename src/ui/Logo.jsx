import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  @media (min-width: 468px) {
    margin-left: 4rem;
  }
`;

const LogoImage = styled.img`
  height: 10rem;
  width: auto;
  max-width: 100%;

  @media (min-width: 468px) {
    height: 10rem;
  }
`;

function Logo() {
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate('/')}>
      <LogoImage src='/logo-dark.png' alt='Isekai Haven logo' />
    </StyledLogo>
  );
}

export default Logo;
