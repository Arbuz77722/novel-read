import { HiBookOpen } from 'react-icons/hi';
import styled from 'styled-components';

const StyledBookCard = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-sm);
  overflow: hidden;

  color: var(--color-grey-500);
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const StyledChapters = styled.span`
  font-size: 1rem;
  color: var(--color-grey-400);
`;

const StyledTitles = styled.h4`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-brand-600);
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledIconFlex = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const CardFooter = styled.footer``;

export function BookCard({ book, onBookClick }) {
  const { cover_url, title, chapter_count: count } = book;

  return (
    <StyledBookCard>
      <StyledImg
        onClick={() => onBookClick?.(book)}
        src={cover_url}
        alt={`cover of ${title}`}
      />
      <ContentWrapper>
        <StyledTitles onClick={() => onBookClick?.(book)}>{title}</StyledTitles>
        <CardFooter>
          <StyledIconFlex>
            <HiBookOpen />
            <StyledChapters>{count} chapters</StyledChapters>
          </StyledIconFlex>
        </CardFooter>
      </ContentWrapper>
    </StyledBookCard>
  );
}
