import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { useBook } from '../books/useBook';
import { useChapter } from './useChapter';
import { useChapters } from './useChapters';
import Spinner from '../../ui/Spinner';
import styled from 'styled-components';
import ChapterNavigation from '../../ui/ChapterNavigation';
import useUpdateLastReadChapter from '../profile/library/useUpdateLastReadChapter';

const StyledChapterContainer = styled.div`
  max-width: 900px; /* keeps content readable */
  margin: 2rem auto; /* center horizontally */
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 12px 12px 0 0;
  border-bottom: 2px solid var(--color-brand-700);
  font-size: 1.8rem;
  line-height: 1.6;
`;

const ChapterContentWrapper = styled.div`
  margin-top: 1.5rem;
  word-break: break-word; /* prevent overflow for long words */
`;

const ChapterText = styled.div`
  line-height: 1.8;

  & p {
    margin-bottom: 1.5rem;
  }

  & img {
    max-width: 100%; /* keeps images inside container */
    height: auto;
    display: block;
    margin: 1rem auto;
  }
`;

const ChapterTitle = styled.h3`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-brand-700);
`;

function ChapterContent() {
  const { slug, chapterId } = useParams();
  const { updateLastReadChapter } = useUpdateLastReadChapter();
  const { book, isLoading: bookLoading } = useBook(slug);
  const { data: chapter, isLoading: chapterLoading } = useChapter(
    book?.id,
    chapterId,
    { enabled: !!book?.id }
  );
  const { chapters = [], isChaptersLoading } = useChapters(book?.id, 1);

  useEffect(
    function () {
      function saveProgress() {
        if (!book?.id || !chapterId) return;
        updateLastReadChapter({ bookId: book?.id, chapterId });
      }
      saveProgress();
    },
    [book?.id, chapterId, updateLastReadChapter]
  );
  if (bookLoading || chapterLoading || isChaptersLoading) return <Spinner />;
  if (!book) return <p>Book not found.</p>;
  if (!chapter) return <p>Chapter not found.</p>;
  if (!chapters.length) return <p>No chapters found.</p>;

  function formatHtmlContent(rawHtml) {
    if (!rawHtml) return '';

    let clean = sanitizeHtml(rawHtml, {
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

      // Remove any <strong> that contains "Chapter" (prefix text)
      if (el.tagName === 'STRONG' && text?.toLowerCase().includes('chapter')) {
        el.remove();
      }

      // Remove <p> if it repeats the chapter title
      if (el.tagName === 'P' && text === chapter.title) {
        el.remove();
      }

      // Remove empty elements or <hr>
      if (!text || el.tagName === 'HR') {
        el.remove();
      }
    });

    // Fix spacing between sentences
    doc.querySelectorAll('p').forEach((p) => {
      p.innerHTML = p.innerHTML.replace(/([.?!])(\S)/g, '$1 $2');
    });

    return doc.body.innerHTML;
  }

  const formatted = formatHtmlContent(chapter.content);

  return (
    <StyledChapterContainer>
      <ChapterNavigation
        chapters={chapters}
        slug={slug}
        currentChapterId={chapter.id}
      />
      <ChapterContentWrapper>
        <ChapterTitle>{chapter.title}</ChapterTitle>
        <ChapterText dangerouslySetInnerHTML={{ __html: formatted }} />
      </ChapterContentWrapper>
      <ChapterNavigation
        chapters={chapters}
        slug={slug}
        currentChapterId={chapter.id}
      />
    </StyledChapterContainer>
  );
}

export default ChapterContent;
