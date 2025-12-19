// ui/ChapterNavigation.js
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft, HiArrowRight, HiBookOpen } from 'react-icons/hi';
import Spinner from './Spinner';

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-brand-700);
    color: #fff;
    padding: 0.8rem 1.5rem;
    font-size: 1.4rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover:not(:disabled) {
      background: var(--color-brand-800);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

export default function ChapterNavigation({
  chapters = [],
  slug,
  currentChapterId,
}) {
  const navigate = useNavigate();

  if (!chapters.length || !currentChapterId) return null;

  const sorted = [...chapters].sort((a, b) => a.number - b.number);
  const currentIndex = sorted.findIndex((c) => c.id === currentChapterId);

  const prevChapter = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return (
    <NavButtons>
      <button
        onClick={() =>
          prevChapter && navigate(`/books/${slug}/chapter/${prevChapter.id}`)
        }
        disabled={!prevChapter}
      >
        <HiArrowLeft size={18} /> Previous
      </button>

      <button onClick={() => navigate(`/books/${slug}`)}>
        <HiBookOpen size={18} /> TOC
      </button>

      <button
        onClick={() =>
          nextChapter && navigate(`/books/${slug}/chapter/${nextChapter.id}`)
        }
        disabled={!nextChapter}
      >
        Next <HiArrowRight size={18} />
      </button>
    </NavButtons>
  );
}
