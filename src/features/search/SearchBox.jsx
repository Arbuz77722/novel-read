import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiFilter, HiOutlineSearch } from 'react-icons/hi';
import styled from 'styled-components';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import ButtonIcon from '../../ui/ButtonIcon';
import { MiniSpinner } from '../../ui/MiniSpinner';
import useSearchBooks from '../books/useSearchBooks';

const Container = styled.div`
  position: relative;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 9;
`;

const Dropdown = styled.div`
  position: absolute;
  top: -31px;
  left: 30px;
  width: 50rem;
  padding: 1rem;
  opacity: 0;
  transform: translateX(-100%);
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--color-grey-0);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &.open {
    opacity: 1;
    transform: translateX(0);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 8px 28px 8px 10px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  background-color: var(--color-grey-100);
  color: var(--color-brand-500);
  outline: none;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 4px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const Results = styled.div`
  max-height: 220px;
  overflow-y: auto;
  margin-top: 8px;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const Cover = styled.img`
  width: 40px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-brand-500);
`;

const SeeAll = styled.div`
  padding: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #0077ff;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const AdvancedSearchLink = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-brand-500);
  &:hover {
    background: var(--color-grey-100);
  }
`;

const SearchLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Empty = styled.div`
  padding: 8px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const { goToBook } = useBookNavigation();
  const navigate = useNavigate();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(id);
  }, [query]);
  const { books, isLoading } = useSearchBooks(debouncedQuery);
  const handleSeeAll = () => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <Container>
      <ButtonIcon
        onClick={() => setOpen(true)}
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
        }}
      >
        <HiOutlineSearch size={20} />
      </ButtonIcon>

      {open && (
        <>
          <Backdrop onClick={handleClose} />
          <Dropdown className={open ? 'open' : ''}>
            <InputWrapper>
              <SearchField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search books...'
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleClose();
                  if (e.key === 'Enter' && query.length >= 3) handleSeeAll();
                }}
              />
              {isLoading && <MiniSpinner />}
              <CloseButton onClick={handleClose}>×</CloseButton>
            </InputWrapper>

            <Results>
              {books.map((book) => (
                <ResultItem
                  key={book.id}
                  onClick={() => {
                    if (book?.slug) {
                      goToBook(book);
                      setOpen(false);
                      setQuery('');
                    }
                  }}
                >
                  <Cover
                    src={book.cover_url || '/fallback-cover.png'}
                    alt={book.title}
                  />
                  <Title>{book.title}</Title>
                </ResultItem>
              ))}

              {!isLoading && books.length === 0 && query.length >= 3 && (
                <Empty>No results found</Empty>
              )}
            </Results>

            <SearchLink>
              {query.length >= 3 && (
                <SeeAll onClick={handleSeeAll}>
                  See all results for "{query}"
                </SeeAll>
              )}
              <AdvancedSearchLink
                onClick={() => {
                  navigate('search/advanced-search');
                  setOpen(false);
                }}
              >
                {' '}
                <HiFilter size={10} /> <span>Advanced search</span>
              </AdvancedSearchLink>
            </SearchLink>
          </Dropdown>
        </>
      )}
    </Container>
  );
}
