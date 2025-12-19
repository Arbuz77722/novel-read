import styled from 'styled-components';
import HomeSlider from './HomeSlider';
import NewOngoingReleases from './NewOngoingReleases';
import Rankings from './Rankings';
import CompletedBooks from './CompletedBooks';
import RecentlyAddedChapters from './RecentlyAddedChapters';
import Spinner from '../../ui/Spinner';
import { useBooks } from '../books/useBooks';

const StyledHomeSections = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 1rem;
`;

function HomeSections() {
  const { books, isBookLoading } = useBooks();
  if (isBookLoading) return <Spinner />;
  if (!books || books.length === 0) return <p>No books found</p>;
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
