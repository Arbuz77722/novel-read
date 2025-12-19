import styled from 'styled-components';
import useBookGenre from '../browse/useBookGenre';
import BookTags from './BookTags';
import AddToLibraryDropDown from '../../ui/AddToLibraryDropDown';
import useLibraryStatus from '../../hooks/useLibraryStatus';
import { useContinueReading } from '../../hooks/useContinueReading';
import { useLibraryEntry } from '../profile/library/useLibraryEntry';
import { useUser } from '../authentication/useUser';

const BookHeaderContainer = styled.div`
  padding: 2.5rem;
  background-color: var(--color-grey-100);
  border-radius: 12px 12px 0 0;
  border-bottom: 3px solid var(--color-brand-700);
  width: 100%;
  box-sizing: border-box;
`;

const BookHeaderFlex = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
`;

const CoverColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 1.5rem;
  min-width: 260px;
`;

const BookCover = styled.img`
  width: 260px;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  margin-top: 0.8rem;

  span {
    font-weight: 600;
    color: var(--color-brand-600);
    font-size: 1.5rem;
  }
`;

const MetadataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.5rem;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: 1.3rem;

  span {
    font-weight: 600;
    color: var(--color-brand-700);
    font-size: 1.7rem;
    margin-bottom: 0.4rem;
  }

  p {
    margin: 0;
    color: var(--color-grey-800);
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

const StatusTag = styled.p`
  display: inline-block;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  background-color: var(--color-brand-900);
  color: var(--color-brand-50);
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1.2rem 0;
  color: var(--color-grey-900);
  line-height: 1.2;
`;

const SectionTitle = styled.h2`
  margin: 1.5rem 0 0.8rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brand-700);
`;

const BookDescription = styled.p`
  color: var(--color-grey-800);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const BottomRow = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ReadNowButton = styled.button`
  border: none;
  outline: none;
  width: 14rem;
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  padding: 1.2rem;
  font-size: 1.3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function BookHeader({ book }) {
  const {
    title,
    cover_url,
    author,
    description,
    type,
    country,
    status: bookStatus,
    id: bookId,
    first_chapter_id,
    slug,
  } = book;

  const { bookGenre } = useBookGenre({ bookId });
  const { libraryStatus, updateStatus } = useLibraryStatus(bookId);
  const { continueReading } = useContinueReading();
  const { libraryEntry } = useLibraryEntry(book.id);
  const { isAuthenticated } = useUser();

  const readingContext = {
    slug: slug,
    firstChapterId: first_chapter_id,
    lastReadChapterId: libraryEntry?.last_read_chapter_id ?? null,
  };

  return (
    <BookHeaderContainer>
      <BookHeaderFlex>
        <CoverColumn>
          <BookCover src={cover_url} alt={`Cover of ${title}`} />
          <MetadataItem>
            <span>Author</span>
            <p>{author}</p>
          </MetadataItem>
          <MetadataItem>
            <span>Status</span>
            <StatusTag>{bookStatus}</StatusTag>
          </MetadataItem>
          <MetadataItem>
            <span>Type</span>
            <p>
              {type} ({country})
            </p>
          </MetadataItem>
        </CoverColumn>

        <ContentColumn>
          <BookTitle>{title}</BookTitle>
          <SectionTitle>Description</SectionTitle>
          <BookDescription>{description}</BookDescription>

          <MetadataList>
            <MetadataItem>
              <span>Genres</span>
              <p>{bookGenre?.genres?.map((g) => g.name).join(', ')}</p>
            </MetadataItem>
          </MetadataList>

          <TagContainer>
            <BookTags bookId={bookId} />
          </TagContainer>

          <BottomRow>
            <ReadNowButton onClick={() => continueReading(readingContext)}>
              Read Now
            </ReadNowButton>
            {isAuthenticated ? (
              <AddToLibraryDropDown
                value={libraryStatus}
                onChange={(e) => updateStatus(e.target.value)}
              />
            ) : null}
          </BottomRow>
        </ContentColumn>
      </BookHeaderFlex>
    </BookHeaderContainer>
  );
}

export default BookHeader;
