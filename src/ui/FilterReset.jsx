import styled from 'styled-components';
import useBrowseParams from '../hooks/useBrowseParams';
import { useLocation } from 'react-router-dom';
import { useAdvancedSearch } from '../context/AdvancedSearchProvider';

const StyledButton = styled.button`
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
  position: absolute;
  top: 14rem;
  right: 2rem;

  &:hover {
    background: var(--color-brand-600);
  }

  @media (min-width: 640px) {
    ${(props) =>
      props.position
        ? `
      position: absolute;
      top: ${props.top !== undefined ? `${props.top}rem` : '10rem'};
      right: ${props.right !== undefined ? `${props.right}rem` : '2rem'};
    `
        : 'position: relative;'}
  }
`;

function ResetButton({ top, right, position, onClick }) {
  const location = useLocation();
  const isBrowsePage = location.pathname.includes('/browse');
  const { resetFilters: browseResetFilter } = useBrowseParams();
  const { resetFilters: advancedSearchResetFilter } = useAdvancedSearch();
  const filterToUse = isBrowsePage
    ? browseResetFilter
    : advancedSearchResetFilter;

  return (
    <StyledButton
      top={top}
      right={right}
      position={position}
      onClick={filterToUse}
    >
      Reset
    </StyledButton>
  );
}

export default ResetButton;
