import styled from 'styled-components';

import { useLatestChapter } from '../features/chapters/useLatestChapter';
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { useNavigate } from 'react-router-dom';

const StyledRecentlyAddedChaptersItem = styled.li`
  display: flex;
  gap: 1rem;
`;
const StyledImg = styled.img`
  width: 40px;
  height: 50px;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledTitle = styled.h6`
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-brand-600);
  }
`;

const StyledStats = styled.span`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-brand-600);
  }
`;
const StyledUpdate = styled.span`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
`;

const FlexGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

function RecentlyAddedChaptersItem({ book, onBookClick }) {
  const navigate = useNavigate();
  const {
    cover_url: cover = '/default-cover.jpg',
    title = 'Untitled Book',
    id,
    slug,
    latest_chapter_at,
    latest_chapter_id,
  } = book || {};
  const { chapter } = useLatestChapter(latest_chapter_id);

  return (
    <StyledRecentlyAddedChaptersItem>
      <StyledImg
        src={cover}
        alt={`cover of ${title}`}
        onClick={() => onBookClick?.(book)}
      />
      <FlexGroup>
        <StyledTitle onClick={() => onBookClick?.(book)}>{title}</StyledTitle>
        <div>
          <StyledStats
            onClick={() => {
              navigate(`/books/${slug}/chapter/${latest_chapter_id}`);
            }}
          >
            {chapter ? chapter.title : 'No chapters'}
          </StyledStats>
          <StyledUpdate>{formatRelativeTime(latest_chapter_at)}</StyledUpdate>
        </div>
      </FlexGroup>
    </StyledRecentlyAddedChaptersItem>
  );
}

export default RecentlyAddedChaptersItem;
