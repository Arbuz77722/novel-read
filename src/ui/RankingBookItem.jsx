import styled from 'styled-components';
import StarRating from './StarRating';
import { EyeIcon, BookmarkPlusIcon } from 'lucide-react';

const StyledBookItem = styled.li`
  display: flex;
  gap: 1rem;
  min-width: 0;
`;
const StyledImg = styled.img`
  width: 40px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledTitle = styled.h6`
  font-size: 1.2rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: var(--color-brand-600);
  }
`;

const StyledStats = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export default function RankingBookItem({ book, type, onBookClick }) {
  const {
    cover_url: cover,
    title,
    views,
    avg_rating: rating,
    rating_count,
    weekly_ratings,
    weekly_views,
    bookmarks,
  } = book;

  return (
    <StyledBookItem>
      <StyledImg
        onClick={() => onBookClick?.(book)}
        src={cover || 'default-cover.jpg'}
        alt={`Cover of ${title || 'Unknown Title'}`}
      />
      <StyledDiv>
        <StyledTitle onClick={() => onBookClick?.(book)}>
          {title || 'Untitled'}
        </StyledTitle>

        {type === 'views' && (
          <>
            <StyledStats aria-label={`${views} views`}>
              <EyeIcon size={16} />
              <span>{views.toLocaleString()} reads</span>
            </StyledStats>
            <StyledStats aria-label={`${bookmarks} bookmarks`}>
              <BookmarkPlusIcon size={16} />
              <span>{bookmarks?.toLocaleString() || 0}</span>
            </StyledStats>
          </>
        )}

        {type === 'trends' && (
          <>
            <StyledStats aria-label={`${weekly_views} weekly views`}>
              <EyeIcon size={16} />
              <span>{weekly_views?.toLocaleString() || 0} reads this week</span>
            </StyledStats>
            <StyledStats aria-label={`${weekly_ratings} weekly ratings`}>
              <StarRating
                size={16}
                rating={weekly_ratings || 0}
                interactive={false}
              />
              <span>({weekly_ratings?.toLocaleString() || 0}) </span>
            </StyledStats>
          </>
        )}

        {type === 'rated' && (
          <>
            <StyledStats aria-label={`${bookmarks} bookmarks`}>
              <BookmarkPlusIcon size={16} />
              <span>{bookmarks?.toLocaleString() || 0}</span>
            </StyledStats>
            <StyledStats aria-label={`Rating ${rating}`}>
              <StarRating size={16} rating={rating || 0} interactive={false} />
              <span>({rating_count?.toLocaleString() || 0})</span>
            </StyledStats>
          </>
        )}
      </StyledDiv>
    </StyledBookItem>
  );
}
