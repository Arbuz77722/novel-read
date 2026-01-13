import styled from 'styled-components';
import StyledNavLink from './StyledNavLink';
import SearchBox from '../features/search/SearchBox';
import { CompassIcon, HomeIcon } from 'lucide-react';

const StyledHeaderMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.3rem;
  align-items: center;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <StyledNavLink to='/' end>
          <HomeIcon size={20} /> Home
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/browse'>
          <CompassIcon size={20} /> Browse
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink notActive=''>
          <SearchBox />
        </StyledNavLink>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
