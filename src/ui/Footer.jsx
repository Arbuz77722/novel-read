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
        {/* Column 1: Logo + rights */}
        <Column>
          <Logo />
          <small>© 2025 Isekai Haven. All rights reserved.</small>
        </Column>

        {/* Column 2: Navigation */}
        <Column>
          <FooterLink href='/ranking'>Ranking</FooterLink>
          <FooterLink href='/latest-chapters'>Latest Chapters</FooterLink>
          <FooterLink href='/latest-novels'>Latest Novels</FooterLink>
          <FooterLink href='/advanced-search'>Advanced Search</FooterLink>
        </Column>

        {/* Column 3: Genres */}
        <Column>
          <FooterLink href='/genre/romance'>Romance</FooterLink>
          <FooterLink href='/genre/harem'>Harem</FooterLink>
          <FooterLink href='/genre/action'>Action</FooterLink>
          <FooterLink href='/genre/fantasy'>Fantasy</FooterLink>
        </Column>

        {/* Column 4: More Genres */}
        <Column>
          <FooterLink href='/genre/supernatural'>Supernatural</FooterLink>
          <FooterLink href='/genre/slice-of-life'>Slice of Life</FooterLink>
          <FooterLink href='/genre/martial-arts'>Martial Arts</FooterLink>
          <FooterLink href='/genre/sci-fi'>Sci-fi</FooterLink>
        </Column>

        {/* Column 5: Legal */}
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
