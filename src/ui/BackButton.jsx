import { HiArrowLeft } from 'react-icons/hi';
import styled from 'styled-components';
import { useBookNavigation } from '../hooks/useBookNavigation';
import { useBook } from '../features/books/useBook';
import { useNavigate, useParams } from 'react-router-dom';

const BackBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-700);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none;
  }
`;

function BackButton() {
  const { slug } = useParams();
  const navigate = useNavigate();
  return (
    <BackBtn onClick={() => navigate(`/books/${slug}`)}>
      <HiArrowLeft size={22} />
      Back
    </BackBtn>
  );
}

export default BackButton;
