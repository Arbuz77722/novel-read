// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ChapterItem = styled.li`
  padding: 1rem 1.2rem;
  border: 1px solid var(--color-brand-500);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const ChapterTitle = styled.span`
  flex: 1;
  color: var(--color-grey-900);
`;

function BookTOCItem({ title, onClick }) {
  return (
    <ChapterItem onClick={onClick}>
      <ChapterTitle>{title}</ChapterTitle>
    </ChapterItem>
  );
}

export default BookTOCItem;
