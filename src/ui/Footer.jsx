import styled from 'styled-components';
import { max_width } from '../utils/constants';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: var(--color-grey-0);
  position: relative;
  margin-top: 1rem;
`;

const FullWidthBorder = styled.div`
  height: 1px;
  background-color: var(--color-grey-100);
  width: 100vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const FooterInner = styled.div`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 4rem 1.6rem;

  @media (min-width: 768px) {
    padding: 4rem 3.2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 4.8rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  gap: 3rem;
  font-size: 1.4rem;

  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--color-grey-900);
  }

  small {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    margin-top: 0.6rem;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: var(--color-grey-700);
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand-600);
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FullWidthBorder />

      <FooterInner>
        <FooterGrid>
          <Column>
            <Logo />
            <small>© 2025 Isekai Haven. All rights reserved.</small>
          </Column>

          <Column>
            <FooterLink to='/browse?order=popular&page=1'>Ranking</FooterLink>
            <FooterLink to='/browse?order=updates&page=1'>
              Latest Chapters
            </FooterLink>
            <FooterLink to='/browse'>Latest Novels</FooterLink>
            <FooterLink to='/search/advanced-search'>
              Advanced Search
            </FooterLink>
          </Column>

          <Column>
            <FooterLink to='/browse?genres=18&page=1'>Romance</FooterLink>
            <FooterLink to='/browse?genres=9&page=1'>Harem</FooterLink>
            <FooterLink to='/browse?genres=1&page=1'>Action</FooterLink>
            <FooterLink to='/browse?genres=7&page=1'>Fantasy</FooterLink>
          </Column>

          <Column>
            <FooterLink to='/browse?genres=29&page=1'>Supernatural</FooterLink>
            <FooterLink to='/browse?genres=26&page=1'>Slice of Life</FooterLink>
            <FooterLink to='/browse?genres=13&page=1'>Martial Arts</FooterLink>
            <FooterLink to='/browse?genres=20&page=1'>Sci-fi</FooterLink>
          </Column>

          <Column>
            <FooterLink to='/privacy-policy'>Privacy Policy</FooterLink>
            <FooterLink to='/terms-of-service'>Terms of Service</FooterLink>
            <FooterLink to='/dmca-notice'>DMCA Notices</FooterLink>
            <FooterLink to='/contact-us'>Contact Us</FooterLink>
          </Column>
        </FooterGrid>
      </FooterInner>
    </FooterWrapper>
  );
}

export default Footer;
