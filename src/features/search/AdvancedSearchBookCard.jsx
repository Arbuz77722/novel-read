import { useSearchParams, Link } from 'react-router-dom';
import { useBooks } from '../books/useBooks';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import { useGenres } from '../browse/useGenres';
import { PAGE_SIZE } from '../../utils/constants';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import AdvancedSearchBookCardItem from './AdvancedSearchBookCardItem';
import styled from 'styled-components';
import StyledHeading from '../../ui/StyledHeading';
import { HiCog8Tooth } from 'react-icons/hi2';
import { useState } from 'react';
import AdvancedSearchFilter from './AdvancedSearchFilter';

const Wrapper = styled.div`
  padding: 20px;
  position: relative;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;
const Empty = styled.p`
  margin-top: 20px;
  font-size: 2rem;
  color: var(-color-grey-100);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-left: auto;
  color: var(--color-brand-500);
`;
const ResultCount = styled.div`
  position: absolute;
  font-size: 2rem;
  color: var(--color-brand-500);
  top: 2rem;
  left: 10rem;
`;

const FilterToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
`;

export default function AdvancedSearchBookCard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { books, isBookLoading, count } = useBooks();
  const { goToBook } = useBookNavigation();
  const { genres = [], isGenreLoading } = useGenres();
  const [isOpen, setIsOpen] = useState(false);

  if (isBookLoading || isGenreLoading) return <Spinner />;

  return (
    <Wrapper>
      <StyledHeading heading='Results' noWidth color='var(--color-brand-600)' />
      <ResultCount>[{count}]</ResultCount>

      <Header>
        <FilterToggle onClick={() => setIsOpen((open) => !open)}>
          <HiCog8Tooth size={20} />
          <span>{isOpen ? 'Hide Filters' : 'Filters'}</span>
        </FilterToggle>
      </Header>

      {isOpen && <AdvancedSearchFilter />}

      {!books.length ? (
        <Empty>
          We couldn’t find any books matching your search. Try different
          keywords or filters.
        </Empty>
      ) : (
        <>
          <List>
            {books.map((book) => (
              <AdvancedSearchBookCardItem
                key={book.id}
                book={book}
                goToBook={goToBook}
                genres={genres}
              />
            ))}
          </List>

          {count > PAGE_SIZE && (
            <Pagination
              count={count}
              pageSize={PAGE_SIZE}
              currentPage={page}
              onPageChange={(newPage) => {
                searchParams.set('page', newPage);
                setSearchParams(searchParams);
              }}
            />
          )}
        </>
      )}
    </Wrapper>
  );
}
