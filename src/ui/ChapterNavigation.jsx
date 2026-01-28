import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowLeft, HiArrowRight, HiBookOpen } from 'react-icons/hi';

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

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

export default function ChapterNavigation({ slug, nav }) {
  const navigate = useNavigate();

  if (!nav) return null;

  return (
    <NavButtons>
      <button
        disabled={!nav.prevId}
        onClick={() => navigate(`/books/${slug}/chapter/${nav.prevId}`)}
      >
        <HiArrowLeft /> Previous
      </button>

      <button onClick={() => navigate(`/books/${slug}`)}>
        <HiBookOpen /> TOC
      </button>

      <button
        disabled={!nav.nextId}
        onClick={() => navigate(`/books/${slug}/chapter/${nav.nextId}`)}
      >
        Next <HiArrowRight />
      </button>
    </NavButtons>
  );
}
