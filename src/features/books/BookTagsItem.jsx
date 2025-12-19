import styled from 'styled-components';
import StyledItemActive from '../../ui/StyledItemActive';

const StyledTag = styled.li`
  padding: 0.5rem 1rem;
  background-color: var(--color-brand-900);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500;
`;

function BookTagsItem({ name }) {
  return <StyledTag>{name}</StyledTag>;
}

export default BookTagsItem;
