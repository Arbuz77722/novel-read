import styled from 'styled-components';

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  border: 1px solid var(--color-grey-400);
  background-color: var(--color-white);
  cursor: pointer;
  font-size: 1.4rem;
  margin-top: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function LoadMore({ page, totalPages, onPageChange }) {
  return (
    <Button
      onClick={() => onPageChange(page + 1)}
      disabled={page >= totalPages}
    >
      {page < totalPages ? 'Load More Comments' : 'No More Comments'}
    </Button>
  );
}
