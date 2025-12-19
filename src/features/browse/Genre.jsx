import styled from 'styled-components';
import GenreList from './GenreList';
import { max_width } from '../../utils/constants';
const StyledGenre = styled.div`
  max-width: ${max_width};
  margin-top: 2rem;
`;

function Genre() {
  return (
    <StyledGenre>
      <GenreList showHeading={true} />
    </StyledGenre>
  );
}

export default Genre;
