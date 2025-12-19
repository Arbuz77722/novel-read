import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const NavArrow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? 'var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? 'var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({
  count,
  pageSize = PAGE_SIZE,
  maxButtons = 5,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get('page') ? +searchParams.get('page') : 1;
  const total = Math.ceil(count / pageSize);

  if (total <= 1) return null;

  const goTo = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    setSearchParams(params, { replace: true }); // updates URL without full reload
  };

  const buttons = [];
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, current + half);

  if (current <= half) end = Math.min(total, maxButtons);
  if (current + half >= total) start = Math.max(1, total - maxButtons + 1);

  if (start > 1) {
    buttons.push(
      <PaginationButton key={1} onClick={() => goTo(1)} active={1 === current}>
        1
      </PaginationButton>
    );
    if (start > 2) buttons.push(<span key='start-ellipsis'>...</span>);
  }

  for (let i = start; i <= end; i++) {
    buttons.push(
      <PaginationButton key={i} onClick={() => goTo(i)} active={i === current}>
        {i}
      </PaginationButton>
    );
  }

  if (end < total) {
    if (end < total - 1) buttons.push(<span key='end-ellipsis'>...</span>);
    buttons.push(
      <PaginationButton
        key={total}
        onClick={() => goTo(total)}
        active={total === current}
      >
        {total}
      </PaginationButton>
    );
  }

  return (
    <StyledPagination>
      <Buttons>
        <PaginationButton
          onClick={() => goTo(current - 1)}
          disabled={current === 1}
        >
          <NavArrow>
            <HiChevronLeft /> <span>Prev</span>
          </NavArrow>
        </PaginationButton>

        {buttons}

        <PaginationButton
          onClick={() => goTo(current + 1)}
          disabled={current === total}
        >
          <NavArrow>
            <span> Next</span> <HiChevronRight />
          </NavArrow>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
