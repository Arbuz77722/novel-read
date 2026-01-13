import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiFilter } from 'react-icons/hi';
import { SearchIcon, X } from 'lucide-react';
import ButtonIcon from '../../ui/ButtonIcon';
import { MiniSpinner } from '../../ui/MiniSpinner';
import useSearchBooks from '../books/useSearchBooks';
import { useBookNavigation } from '../../hooks/useBookNavigation';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 7px;
  width: 0;
  opacity: 0;
  margin-left: 0;

  transition: width 0.25s ease, opacity 0.2s ease, margin-left 0.2s ease;

  ${({ $open }) =>
    $open &&
    `
      width: 22rem;
      opacity: 1;
      margin-left: 0.5rem;
    `}

  @media (max-width: 480px) {
    ${({ $open }) =>
      $open &&
      `
        width: 100%;
      `}
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchField = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 3.2rem 0 1rem;
  border-radius: 8px;
  border: none;
  background-color: var(--color-grey-100);
  color: var(--color-brand-600);
  font-size: 1.4rem;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-brand-500);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
`;

const Results = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;

  width: 100%;
  max-height: 260px;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;

  overflow-y: auto;
  z-index: 50;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Cover = styled.img`
  width: 32px;
  height: 44px;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const FooterLinks = styled.div`
  border-top: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: space-between;
`;

const FooterItem = styled.button`
  flex: 1;
  padding: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-brand-600);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const Empty = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { goToBook } = useBookNavigation();

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(id);
  }, [query]);

  const { books, isLoading } = useSearchBooks(debouncedQuery);

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeSearch = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <Container ref={wrapperRef}>
      <ButtonIcon onClick={() => setOpen((o) => !o)}>
        {open ? <X size={20} /> : <SearchIcon size={20} />}
      </ButtonIcon>

      <SearchWrapper $open={open}>
        <InputWrapper>
          <SearchField
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search books...'
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeSearch();
              if (e.key === 'Enter' && query.length >= 3) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
                closeSearch();
              }
            }}
          />

          {isLoading && <MiniSpinner />}
          {open && query && (
            <CloseButton onClick={closeSearch}>
              <X size={16} />
            </CloseButton>
          )}
        </InputWrapper>
      </SearchWrapper>

      {open && (
        <Results>
          {books.map((book) => (
            <ResultItem
              key={book.id}
              onClick={() => {
                goToBook(book);
                closeSearch();
              }}
            >
              <Cover src={book.cover_url || '/fallback-cover.png'} />
              <Title>{book.title}</Title>
            </ResultItem>
          ))}

          {!isLoading && books.length === 0 && query.length >= 3 && (
            <Empty>No results found</Empty>
          )}

          {query.length >= 3 && (
            <FooterLinks>
              <FooterItem
                onClick={() => {
                  navigate(`/search?query=${encodeURIComponent(query)}`);
                  closeSearch();
                }}
              >
                See all
              </FooterItem>

              <FooterItem
                onClick={() => {
                  navigate('/search/advanced-search');
                  closeSearch();
                }}
              >
                <HiFilter size={14} />
                Advanced
              </FooterItem>
            </FooterLinks>
          )}
        </Results>
      )}
    </Container>
  );
}
