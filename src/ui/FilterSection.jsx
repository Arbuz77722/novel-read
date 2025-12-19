import styled from 'styled-components';
import StyledHeading from './StyledHeading';
import StyledItemActive from './StyledItemActive';

const StyledSection = styled.ul``;

const StyledContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

function FilterSection({
  title,
  options,
  activeOption,
  onSelect,
  showHeading,
}) {
  return (
    <StyledSection>
      {showHeading && <StyledHeading noWidth heading={title} />}
      <StyledContainer>
        {options.map((option) => (
          <StyledItemActive
            key={option}
            active={activeOption === option.toLowerCase()}
            onClick={() => onSelect(option.toLowerCase())}
          >
            {option}
          </StyledItemActive>
        ))}
      </StyledContainer>
    </StyledSection>
  );
}

export default FilterSection;
