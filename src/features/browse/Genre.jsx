import styled from 'styled-components';
import GenreList from './GenreList';
import { max_width } from '../../utils/constants';
import { useGenres } from './useGenres';
import GenreSkeleton from '../../ui/skeletons/GenreSkeleton';
const StyledGenre = styled.div`
  max-width: ${max_width};
  margin-top: 2rem;
`;

function Genre() {
  const { isGenreLoading } = useGenres();

  if (isGenreLoading) return <GenreSkeleton showHeading={true} />;
  return (
    <StyledGenre>
      <GenreList showHeading={true} />
    </StyledGenre>
  );
}

export default Genre;
