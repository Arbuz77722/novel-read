import { useState } from 'react';
import styled from 'styled-components';
import useBookTags from '../browse/useBookTags';
import BookTagsItem from './BookTagsItem';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';

const TagWrapper = styled.div`
  margin-top: 1.5rem;
`;

const TagHeading = styled.h3`
  color: var(--color-brand-700);
  margin-bottom: 0.8rem;
`;

const TagsContainer = styled.div`
  position: relative;
`;

const StyledTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  max-height: ${(props) => (props.$expanded ? '500px' : '90px')};
  transition: max-height 0.3s ease-in-out;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-600);
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: -2.2rem;
  font-size: 1rem;
  font-weight: 500;

  svg {
    margin-left: 0.3rem;
    font-size: 1.2rem;
  }

  &:hover {
    color: var(--color-brand-800);
  }
`;

function BookTags({ bookId }) {
  const { bookTags } = useBookTags({ bookId });
  const [expanded, setExpanded] = useState(false);

  if (!bookTags?.tags || bookTags.tags.length === 0) return null;

  return (
    <TagWrapper>
      <TagHeading>Tags</TagHeading>

      <TagsContainer>
        <StyledTags $expanded={expanded}>
          {bookTags.tags.map((tag) => (
            <BookTagsItem key={tag.id} name={tag.name} />
          ))}
        </StyledTags>

        {bookTags.tags.length > 6 && (
          <ToggleButton onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? 'Show Less' : 'Show More'}
            {expanded ? <HiArrowUp /> : <HiArrowDown />}
          </ToggleButton>
        )}
      </TagsContainer>
    </TagWrapper>
  );
}

export default BookTags;
