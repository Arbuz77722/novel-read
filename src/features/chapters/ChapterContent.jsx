import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

import { useBook } from '../books/useBook';
import { useChapter } from './useChapter';
import { useChapterNavigation } from './useChapterNavigation';
import useUpdateLastReadChapter from '../profile/edit/useUpdateLastReadChapter';
import { useUser } from '../authentication/useUser';

import ChapterNavigation from '../../ui/ChapterNavigation';
import CommentSection from '../comments/CommentSection';
import ChapterContentSkeleton from '../../ui/skeletons/ChapterContentSkeleton';
import { useReaderSettings } from '../../hooks/useReadingSettings';

const StyledChapterContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0;
  background-color: var(--color-grey-100);
  border-radius: 12px 12px 0 0;
  border-bottom: 2px solid var(--color-brand-700);

  @media (min-width: 480px) {
    padding: 2rem;
  }
`;

const ChapterContentWrapper = styled.div`
  margin-top: 1.5rem;
  word-break: break-word;
`;

const ChapterTitle = styled.h3`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-brand-700);
`;

const ReaderTools = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem;

  button,
  select {
    padding: 0.4rem 0.6rem;
    font-size: 1.5rem;
    border-radius: 6px;
    border: 1px solid var(--color-grey-300);
    background: var(--color-grey-100);
    cursor: pointer;
  }
`;

const ChapterText = styled.div`
  line-height: 1.8;

  & p {
    margin-bottom: 1.5rem;
  }

  & img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem auto;
  }
`;

const NoUserMessage = styled.p`
  max-width: 50rem;
  margin: 15rem auto;
  padding: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 7px;
  background-color: var(--color-grey-50);
  color: var(--color-brand-100);
`;

const ChapterFooter = styled.div`
  margin-top: 15rem;
`;

function ChapterContent() {
  const { slug, chapterId } = useParams();
  const location = useLocation();

  const { book, isLoading: bookLoading } = useBook(slug);
  const { data: chapter, isLoading: chapterLoading } = useChapter(
    book?.id,
    chapterId,
  );
  const { nav } = useChapterNavigation(book?.id, chapter);
  const { updateLastReadChapter } = useUpdateLastReadChapter();
  const { user, isAuthenticated } = useUser();
  const { fontSize, setFontSize, fontFamily, setFontFamily, fontCss } =
    useReaderSettings();

  useEffect(() => {
    if (!book?.id || !chapterId) return;
    updateLastReadChapter({ bookId: book.id, chapterId });
  }, [book?.id, chapterId, updateLastReadChapter]);

  if (bookLoading || chapterLoading || !chapter) {
    return <ChapterContentSkeleton />;
  }

  if (!book) return <p>Book not found.</p>;

  function formatHtmlContent(rawHtml) {
    if (!rawHtml) return '';

    const clean = sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt'],
      },
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, 'text/html');

    doc.querySelectorAll('strong, hr, p').forEach((el) => {
      const text = el.textContent?.trim();

      if (el.tagName === 'STRONG' && text?.toLowerCase().includes('chapter')) {
        el.remove();
      }

      if (el.tagName === 'P' && text === chapter.title) {
        el.remove();
      }

      if (!text || el.tagName === 'HR') {
        el.remove();
      }
    });

    doc.querySelectorAll('p').forEach((p) => {
      p.innerHTML = p.innerHTML.replace(/([.?!])(\S)/g, '$1 $2');
    });

    return doc.body.innerHTML;
  }

  const formatted = formatHtmlContent(chapter.content);

  return (
    <>
      <StyledChapterContainer>
        <ChapterNavigation slug={slug} nav={nav} />

        <ChapterContentWrapper>
          <ChapterTitle>{chapter.title}</ChapterTitle>
          <ReaderTools>
            <button onClick={() => setFontSize((s) => Math.max(1.4, s - 0.1))}>
              A-
            </button>
            <button onClick={() => setFontSize((s) => Math.min(2.4, s + 0.1))}>
              A+
            </button>

            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value='serif'>Serif (Georgia)</option>
              <option value='sans'>Sans (Inter)</option>
              <option value='nunito'>Nunito</option>
              <option value='merriweather'>Merriweather</option>
              <option value='poppins'>Poppins</option>
            </select>
          </ReaderTools>
          <ChapterText
            style={{
              fontSize: `${fontSize}rem`,
              fontFamily: fontCss,
            }}
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        </ChapterContentWrapper>

        <ChapterNavigation slug={slug} nav={nav} />
      </StyledChapterContainer>

      {!user || !isAuthenticated ? (
        <NoUserMessage>
          Only logged in users can see the comments.
        </NoUserMessage>
      ) : (
        <ChapterFooter>
          <CommentSection
            targetId={chapter.id}
            targetType='chapter'
            expandCommentId={location.state?.expandCommentId}
          />
        </ChapterFooter>
      )}
    </>
  );
}

export default ChapterContent;
