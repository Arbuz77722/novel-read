import { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { max_width } from '../utils/constants';
import { NotificationSettingsProvider } from '../context/NotificationSettingsContext';
import ScrollToTop from './ScrollToTop';
import ScrollToTopArrowButton from './ScrollToTopArrowButton';

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-grey-0);
`;

const MainContainer = styled.div`
  max-width: ${max_width};
  margin: 0 auto;
  padding: 1.6rem;

  @media (min-width: 768px) {
    padding: 0 3.2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 4.8rem;
  }
`;

function AppLayout() {
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio('/notification.wav');
      audio.volume = 0.01;

      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {});
    };

    document.addEventListener('click', unlockAudio, { once: true });
    return () => document.removeEventListener('click', unlockAudio);
  }, []);

  return (
    <NotificationSettingsProvider>
      <AppWrapper>
        <ScrollToTop />
        <Header />
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Footer />
        <ScrollToTopArrowButton />
      </AppWrapper>
    </NotificationSettingsProvider>
  );
}

export default AppLayout;
