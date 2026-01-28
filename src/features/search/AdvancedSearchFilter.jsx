import styled from 'styled-components';
import Select from 'react-select';
import StyledHeading from '../../ui/StyledHeading';
import FilterByStatus from '../../ui/FilterByStatus';
import SortByOrder from '../../ui/SortByOrder';
import GenreList from '../browse/GenreList';
import ResetButton from '../../ui/FilterReset';
import { useAdvancedSearch } from '../../context/AdvancedSearchProvider';
import useTags from './useTags';

const AdvancedSearchContainer = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Section = styled.div``;

const SectionTitle = styled.h3`
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--color-brand-600);
  margin-bottom: 1.2rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
`;

const OptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.7rem;
  color: var(--color-brand-500);
  cursor: pointer;

  input {
    width: 1.5rem;
    height: 1.5rem;
    accent-color: var(--color-brand-500);
    cursor: pointer;
  }
`;

const ControlRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;

  input {
    padding: 0.6rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--color-grey-300);
    font-size: 1.5rem;
    color: var(--color-brand-600);

    &::placeholder {
      color: var(--color-brand-400);
    }
  }
`;

const SortSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 1.5rem;
  color: var(--color-brand-600);
  background-color: white;
  cursor: pointer;
  height: 40px;
  min-width: 120px;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 1.2rem;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }
`;

const ChapterCount = styled(ControlRow)`
  align-items: center;

  input {
    width: 8rem;
  }
`;

const FilterButton = styled.button`
  align-self: flex-start;
  padding: 0.9rem 1.6rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: var(--color-brand-500);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--color-brand-600);
  }
`;

const StyledSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 100%;

  .react-select__placeholder {
    color: var(--color-brand-500);
    font-style: italic;
  }

  .react-select__dropdown-indicator {
    color: var(--color-brand-600);
  }

  .react-select__dropdown-indicator:hover {
    color: var(--color-brand-700);
  }

  .react-select__value-container {
    flex-wrap: wrap;
    gap: 4px;
  }

  .react-select__control {
    border-radius: 6px;
    border: 1px solid var(--color-grey-300);
    min-height: 40px;
    font-size: 1.5rem;
    color: var(--color-brand-500);
    width: 100%;
  }

  .react-select__multi-value {
    background-color: var(--color-brand-100);
    color: var(--color-brand-600);
    font-weight: 600;
  }

  .react-select__multi-value__label {
    color: var(--color-brand-600);
    font-weight: 600;
  }

  .react-select__multi-value__remove {
    color: var(--color-brand-600);
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-200);
      color: var(--color-brand-700);
    }
  }

  .react-select__option {
    cursor: pointer;
    color: var(--color-brand-600);
  }

  .react-select__option--is-focused {
    background-color: var(--color-brand-100);
  }
`;

const GenreSelect = styled.select`
  font-weight: 400;
  margin-left: 1rem;
  font-size: 1.3rem;
  color: var(--color-brand-400);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  background-color: white;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function AdvancedSearchFilter() {
  const { tags } = useTags();
  const {
    draftFilters,
    setDraftFilters,
    applyFilters,
    resetFilters,
    hasActiveFilters,
  } = useAdvancedSearch();

  const toggleType = (type) => {
    setDraftFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const toggleLanguage = (language) => {
    setDraftFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }));
  };

  const toggleGenre = (genre) => {
    setDraftFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  return (
    <AdvancedSearchContainer>
      <StyledHeading
        heading='Advanced Search'
        Width
        color='var(--color-brand-600)'
        borderColor='var(--color-grey-200)'
      />

      <Section>
        <SectionTitle>Novel Type</SectionTitle>
        <OptionsGrid>
          <OptionItem>
            <input
              type='checkbox'
              checked={draftFilters.types.includes('lightnovel')}
              onChange={() => toggleType('lightnovel')}
            />
            Light Novel
          </OptionItem>
          <OptionItem>
            <input
              type='checkbox'
              checked={draftFilters.types.includes('webnovel')}
              onChange={() => toggleType('webnovel')}
            />
            Web Novel
          </OptionItem>
        </OptionsGrid>
      </Section>

      <Section>
        <SectionTitle>Language</SectionTitle>
        <OptionsGrid>
          {['chinese', 'japanese', 'korean'].map((lang) => (
            <OptionItem key={lang}>
              <input
                type='checkbox'
                checked={draftFilters.languages.includes(lang)}
                onChange={() => toggleLanguage(lang)}
              />
              {lang[0].toUpperCase() + lang.slice(1)}
            </OptionItem>
          ))}
        </OptionsGrid>
      </Section>

      <Section>
        <SectionTitle>Chapters</SectionTitle>
        <ChapterCount>
          <input
            type='number'
            placeholder='Min'
            value={draftFilters.min}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, min: e.target.value }))
            }
          />
          <input
            type='number'
            placeholder='Max'
            value={draftFilters.max}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, max: e.target.value }))
            }
          />
        </ChapterCount>
      </Section>

      <Section>
        <SectionTitle>
          Genres
          <GenreSelect
            value={draftFilters.genreMode}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                genreMode: e.target.value,
              }))
            }
          >
            <option value='and'>AND</option>
            <option value='or'>OR</option>
          </GenreSelect>
        </SectionTitle>
        <GenreList
          showHeading={false}
          activeGenres={draftFilters.genres}
          onToggleGenre={toggleGenre}
        />
      </Section>

      <Section>
        <SectionTitle>Tags</SectionTitle>
        <ControlRow>
          <StyledSelect
            isMulti
            placeholder='Include tags...'
            options={tags}
            value={tags.filter((t) =>
              draftFilters.includeTags?.includes(t.value),
            )}
            onChange={(selected) =>
              setDraftFilters((prev) => ({
                ...prev,
                includeTags: selected.map((s) => s.value),
              }))
            }
          />
          <StyledSelect
            isMulti
            placeholder='Exclude tags...'
            options={tags}
            value={tags.filter((t) =>
              draftFilters.excludeTags?.includes(t.value),
            )}
            onChange={(selected) =>
              setDraftFilters((prev) => ({
                ...prev,
                excludeTags: selected.map((s) => s.value),
              }))
            }
          />
        </ControlRow>
      </Section>

      <Section>
        <SectionTitle>Status</SectionTitle>
        <FilterByStatus
          showHeading={false}
          active={draftFilters.status}
          onChange={(val) =>
            setDraftFilters((prev) => ({ ...prev, status: val }))
          }
        />
      </Section>

      <Section>
        <SectionTitle>Rating</SectionTitle>
        <ChapterCount>
          <input
            type='number'
            placeholder='Min ★'
            min='0'
            max='5'
            step='0.1'
            value={draftFilters.ratingMin || ''}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                ratingMin: e.target.value,
              }))
            }
          />
          <input
            type='number'
            placeholder='Max ★'
            min='0'
            max='5'
            step='0.1'
            value={draftFilters.ratingMax || ''}
            onChange={(e) =>
              setDraftFilters((prev) => ({
                ...prev,
                ratingMax: e.target.value,
              }))
            }
          />
        </ChapterCount>
      </Section>

      <Section>
        <SectionTitle>Sort</SectionTitle>
        <ControlRow>
          <SortByOrder
            showHeading={false}
            active={draftFilters.order}
            onChange={(val) =>
              setDraftFilters((prev) => ({ ...prev, order: val }))
            }
          />
          <SortSelect
            value={draftFilters.sort}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </SortSelect>
        </ControlRow>
      </Section>

      <Buttons>
        <FilterButton onClick={applyFilters}>Apply Filter</FilterButton>
        {hasActiveFilters && <ResetButton onClick={resetFilters} />}
      </Buttons>
    </AdvancedSearchContainer>
  );
}
