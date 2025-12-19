import { useState } from 'react';
import { HiArrowDown, HiArrowUp } from 'react-icons/hi';
import styled from 'styled-components';

const Text = styled.div`
  line-height: 1.6;
  font-size: 1.4rem;
`;

const ToggleButton = styled.span`
  color: var(--color-brand-700);
  cursor: pointer;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export default function ExpandableText({ text, charLimit = 200 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > charLimit;
  const displayedText =
    expanded || !isLong ? text : text.slice(0, charLimit) + '...';

  return (
    <Text>
      {displayedText}
      {isLong && (
        <ToggleButton onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show Less' : 'Show More'}
          {expanded ? <HiArrowUp /> : <HiArrowDown />}
        </ToggleButton>
      )}
    </Text>
  );
}
