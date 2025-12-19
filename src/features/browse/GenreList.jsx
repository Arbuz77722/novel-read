import styled from 'styled-components';
import StyledHeading from '../../ui/StyledHeading';
import { useGenres } from './useGenres';
import GenreItem from './GenreItem';
import useBrowseParams from '../../hooks/useBrowseParams';
import ResetButton from '../../ui/FilterReset';
import { useLocation } from 'react-router-dom';
import { useAdvancedSearch } from '../../context/AdvancedSearchProvider';

const StyledGenre = styled.ul`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

function GenreList({ showHeading, activeGenres, onToggleGenre }) {
  const location = useLocation();
  const isBrowsePage = location.pathname.includes('/browse');
  const { genres = [] } = useGenres();
  const {
    selectedGenres: browseSelectedGenres,
    toggleGenre: browseToggleGenre,
  } = useBrowseParams();
  const {
    selectedGenres: advancedSelectedGenres,
    toggleGenre: advancedToggleGenre,
  } = useAdvancedSearch();

  const genresToUse = isBrowsePage
    ? browseSelectedGenres
    : activeGenres || advancedSelectedGenres;
  const toggleGenre = isBrowsePage
    ? browseToggleGenre
    : onToggleGenre || advancedToggleGenre;

  return (
    <>
      {showHeading && <StyledHeading noWidth heading='Genre / Category' />}
      <StyledGenre>
        <GenreItem
          key='all'
          name='All'
          onClick={() => toggleGenre('all')}
          active={genresToUse.includes('all')}
        />
        {genres?.map((genre) => (
          <GenreItem
            key={genre.id}
            name={genre.name}
            active={genresToUse.includes(genre.id.toString())}
            onClick={() => toggleGenre(genre.id.toString())}
          />
        ))}
      </StyledGenre>
    </>
  );
}

export default GenreList;
