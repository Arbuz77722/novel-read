import { useChapters } from '../chapters/useChapters';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styled from 'styled-components';
import BookTOCItem from './BookTOCItem';
import { useQueryClient } from '@tanstack/react-query';

const TOCContainer = styled.div`
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: 0 0 12px 12px;
`;

const TOCGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const TOCHeader = styled.h2`
  text-align: center;
  margin: 2rem 0;
  color: var(--color-grey-900);
  display: inline-block;
  border-bottom: 2px solid var(--color-grey-200);
`;

function TableOfContents({ bookId, slug }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? +searchParams.get('page') : 1;
  const navigate = useNavigate();
  const { chapters, isChaptersLoading, count } = useChapters(bookId, page);
  if (isChaptersLoading) return <Spinner />;
  if (!chapters.length) return <p>No chapters found.</p>;

  return (
    <TOCContainer>
      <TOCHeader>Table of Contents</TOCHeader>
      <TOCGrid>
        {chapters.map((chapter) => (
          <BookTOCItem
            key={chapter.id}
            title={chapter.title}
            onClick={() => {
              navigate(`/books/${slug}/chapter/${chapter.id}`);
            }}
          />
        ))}
      </TOCGrid>
      <Pagination count={count} mode='range' pageSize={100} />
    </TOCContainer>
  );
}

export default TableOfContents;
