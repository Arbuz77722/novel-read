import styled from 'styled-components';
import StyledNavLink from './StyledNavLink';
import SearchBox from '../features/search/SearchBox';
import { HiHome, HiLibrary } from 'react-icons/hi';
import { useState } from 'react';
import Test from './Test';

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
          <HiHome size={20} /> Home
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/browse'>
          <HiLibrary size={20} /> Browse
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink notActive=''>
          <SearchBox />
        </StyledNavLink>
      </li>

      {/* <li>
        <StyledNavLink to='/about'>
          <HiInformationCircle size={20} /> About
        </StyledNavLink>
      </li> */}
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
