import styled from 'styled-components';
import AddToLibraryDropDown from './AddToLibraryDropDown';
import useLibraryStatus from '../hooks/useLibraryStatus';
import ProgressBar from './ProgressBar';
import { timeAgo } from '../utils/timeAgo';

const StyledCard = styled.li`
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-sm);

  @media (min-width: 468px) {
    padding: 1.2rem;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.6rem;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Cover = styled.img`
  width: 8rem;
  height: 10rem;
  border-radius: 8px;
  object-fit: cover;
`;

const ContinueButton = styled.button`
  width: 100%;
  height: 3.2rem;
  font-size: 1.2rem;
  border-radius: 6px;
  border: none;
  background-color: var(--color-brand-600);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const UpdatedAt = styled.div`
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--color-grey-200);
  font-size: 1.1rem;
  color: var(--color-grey-600);
`;

const ProgressSection = styled.div`
  margin-top: 1rem;
  display: flex;

  flex-direction: column;
  gap: 0.4rem;
`;

const ProgressText = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-700);
`;

const BottomRow = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`;

function LibraryBookCard({ book, onContinue }) {
  const {
    id: bookId,
    cover_url,
    title,
    chapter_count,
    slug,
    first_chapter_id,
    lastReadChapterId,
    number,
    status,
    lastUpdated,
  } = book;

  const currentChapter = number ?? 1;
  const progressPercent = Math.round((currentChapter / chapter_count) * 100);

  const { libraryStatus, updateStatus } = useLibraryStatus(bookId);

  const readingContext = {
    slug,
    firstChapterId: first_chapter_id,
    lastReadChapter: lastReadChapterId,
  };

  return (
    <StyledCard>
      <Layout>
        <LeftColumn>
          <Cover src={cover_url} alt={`cover of ${title}`} />
          <ContinueButton onClick={() => onContinue(readingContext)}>
            Continue
          </ContinueButton>
        </LeftColumn>

        <RightColumn>
          <Title>{title}</Title>

          <UpdatedAt>{timeAgo(lastUpdated)}</UpdatedAt>

          <ProgressSection>
            <ProgressText>
              Chapter {currentChapter} / {chapter_count}
            </ProgressText>
            <ProgressBar value={progressPercent} />
          </ProgressSection>

          <BottomRow>
            <AddToLibraryDropDown
              value={libraryStatus ?? status}
              onChange={(e) => updateStatus(e.target.value)}
              variant='compact'
            />
          </BottomRow>
        </RightColumn>
      </Layout>
    </StyledCard>
  );
}

export default LibraryBookCard;
