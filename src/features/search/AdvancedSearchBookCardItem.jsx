import { useState } from 'react';
import StarRating from '../../ui/StarRating';
import styled from 'styled-components';
import { HiChatBubbleOvalLeft } from 'react-icons/hi2';
import { HiBadgeCheck, HiBookOpen } from 'react-icons/hi';

const BookCard = styled.div`
  display: flex;
  gap: 2rem;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--color-grey-200);
  align-items: flex-start;

  transition: background 0.2s ease;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const Cover = styled.img`
  width: 150px;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const Country = styled.span`
  font-size: 1rem;
  color: var(--color-brand-500);
  font-weight: bold;
  margin-top: 4px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 4px;
  cursor: pointer;
  color: var(--color-brand-500);
`;

const Meta = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  color: var(--color-brand-500);

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 6px;
`;

const Tag = styled.span`
  background-color: var(--color-brand-200);
  color: var(--color-brand-500);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 1.2rem;
`;

const BookDescription = styled.p`
  margin-top: 8px;
  font-size: 1.5rem;
  color: var(--color-grey-700);
  white-space: pre-line;
`;

const ToggleBtn = styled.span`
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 1.5rem;
  cursor: pointer;
`;

export default function AdvancedSearchBookCardItem({ book, goToBook, genres }) {
  const [expanded, setExpanded] = useState(false);

  const {
    cover_url = '/fallback-cover.png',
    title = 'Untitled Book',
    description = '',
    genre_ids = [],
    genres: bookGenresData = [],
    rating = 0,
    country = 'CN',
    reviews_count = 0,
    status = 'N/A',
    chapter_count = 0,
  } = book || {};

  const words = description ? description.split(' ') : [];
  const shortDesc = words.slice(0, 20).join(' ') + '\n';
  const bookGenres = bookGenresData.length
    ? bookGenresData.map((g) => g.name).filter(Boolean)
    : Array.isArray(genre_ids)
    ? genre_ids
        .map((id) => genres?.find((g) => g.id === id)?.name)
        .filter(Boolean)
    : [];

  return (
    <BookCard>
      <LeftColumn>
        <Cover src={cover_url} alt={title} />
        <StarRating size={18} value={rating} color='#4f46e5' />
        <Country>
          {country} ({rating.toFixed(1)})
        </Country>
      </LeftColumn>
      <RightColumn>
        <Info>
          <Title
            onClick={() => {
              console.log('Card clicked:', book.id);
              goToBook(book);
            }}
          >
            {title}
          </Title>
          <Meta>
            <HiChatBubbleOvalLeft />
            <span>{reviews_count} Reviews</span>
            <HiBadgeCheck />
            <span>Status: {status}</span>
            <HiBookOpen />
            <span>{chapter_count} chapters</span>
          </Meta>
          <TagList>
            {bookGenres.length ? (
              bookGenres.map((name) => <Tag key={name}>{name}</Tag>)
            ) : (
              <Tag>No genres</Tag>
            )}
          </TagList>
          <BookDescription>
            {expanded ? description : shortDesc}
            {words.length > 20 && (
              <ToggleBtn
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((prev) => !prev);
                }}
              >
                {expanded ? ' << Less' : ' ...More >>'}
              </ToggleBtn>
            )}
          </BookDescription>
        </Info>
      </RightColumn>
    </BookCard>
  );
}
