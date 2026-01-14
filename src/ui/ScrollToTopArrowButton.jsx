import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChevronUp } from 'lucide-react';

const Button = styled.button`
  position: fixed;
  bottom: 7.4rem;
  right: 2.4rem;

  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: none;
  background-color: var(--color-brand-700);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: opacity 0.25s ease, transform 0.25s ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0)' : 'translateY(10px)'};

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function ScrollToTopArrowButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Button onClick={scrollToTop} $visible={visible} aria-label='Scroll to top'>
      <ChevronUp size={22} />
    </Button>
  );
}

export default ScrollToTopArrowButton;
