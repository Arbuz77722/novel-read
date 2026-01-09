import styled from 'styled-components';
import { max_width } from '../utils/constants';
import Logo from './Logo';

const StyledFooter = styled.footer`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 4rem 4.8rem;
  color: var(--color-grey-700);
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4rem;
  font-size: 1.4rem;
`;

const FullWidthBorder = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
  width: 100vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h4 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--color-grey-900);
  }

  & small {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    margin-top: 0.6rem;
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: var(--color-grey-700);
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand-600);
  }
`;

function Footer() {
  return (
    <div style={{ position: 'relative' }}>
      <FullWidthBorder />
      <StyledFooter>
        <Column>
          <Logo />
          <small>© 2025 Isekai Haven. All rights reserved.</small>
        </Column>

        <Column>
          <FooterLink href='/ranking'>Ranking</FooterLink>
          <FooterLink href='/latest-chapters'>Latest Chapters</FooterLink>
          <FooterLink href='/latest-novels'>Latest Novels</FooterLink>
          <FooterLink href='/search/advanced-search'>
            Advanced Search
          </FooterLink>
        </Column>

        <Column>
          <FooterLink href='/browse?genres=18&page=1'>Romance</FooterLink>
          <FooterLink href='/browse?genres=9&page=1'>Harem</FooterLink>
          <FooterLink href='/browse?genres=1&page=1'>Action</FooterLink>
          <FooterLink href='/browse?genres=7&page=1'>Fantasy</FooterLink>
        </Column>

        <Column>
          <FooterLink href='/browse?genres=29&page=1'>Supernatural</FooterLink>
          <FooterLink href='/browse?genres=26&page=1'>Slice of Life</FooterLink>
          <FooterLink href='/browse?genres=13&page=1'>Martial Arts</FooterLink>
          <FooterLink href='/browse?genres=20&page='>Sci-fi</FooterLink>
        </Column>

        <Column>
          <FooterLink href='/privacy-policy'>Privacy Policy</FooterLink>
          <FooterLink href='/terms-of-service'>Terms of Service</FooterLink>
          <FooterLink href='/dmca'>DMCA Notices</FooterLink>
          <FooterLink href='/contact'>Contact Us</FooterLink>
        </Column>
      </StyledFooter>
    </div>
  );
}

export default Footer;
