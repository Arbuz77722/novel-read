import { BookOpenIcon } from 'lucide-react';

import styled from 'styled-components';

const StyledBookCard = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--color-grey-0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${StyledBookCard}:hover & {
    transform: scale(1.08);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;

  ${StyledBookCard}:hover & {
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.2rem;
  gap: 0.8rem;
`;

const StyledTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-grey-900);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: color 0.2s ease;

  &:hover {
    color: var(--color-brand-600);
  }
`;

const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
`;

const StyledChapterCount = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StyledBookIcon = styled(BookOpenIcon)`
  color: var(--color-brand-600);
  width: 18px;
  height: 18px;
`;

export function BookCard({ book, onBookClick }) {
  const { cover_url, title, chapter_count: count } = book;

  // Fallback image if cover is missing
  const fallbackCover =
    'https://via.placeholder.com/300x220/cccccc/666666?text=No+Cover';

  return (
    <StyledBookCard onClick={() => onBookClick?.(book)}>
      <ImageContainer>
        <StyledImg
          src={cover_url || fallbackCover}
          alt={`Cover of ${title}`}
          onError={(e) => (e.target.src = fallbackCover)} // Fallback on load error
        />
        <ImageOverlay />
      </ImageContainer>

      <ContentWrapper>
        <StyledTitle>{title}</StyledTitle>

        <CardFooter>
          <StyledChapterCount>
            <StyledBookIcon />
            {count} {count === 1 ? 'chapter' : 'chapters'}
          </StyledChapterCount>
        </CardFooter>
      </ContentWrapper>
    </StyledBookCard>
  );
}
