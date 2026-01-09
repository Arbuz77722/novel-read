import styled from 'styled-components';
import HomeSlider from './HomeSlider';
import NewOngoingReleases from './NewOngoingReleases';
import Rankings from './Rankings';
import CompletedBooks from './CompletedBooks';
import RecentlyAddedChapters from './RecentlyAddedChapters';

const StyledHomeSections = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 1rem;
`;

function HomeSections() {
  return (
    <StyledHomeSections>
      <HomeSlider />
      <NewOngoingReleases />
      <Rankings />
      <CompletedBooks />
      <RecentlyAddedChapters />
    </StyledHomeSections>
  );
}

export default HomeSections;
