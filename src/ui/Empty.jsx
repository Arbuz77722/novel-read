import styled from 'styled-components';

const StyledEmpty = styled.div`
  padding: 4rem 1rem;
  text-align: center;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`;

function Empty({ status }) {
  const messages = {
    reading: 'You are not reading any books yet.',
    completed: 'You have not completed any books yet.',
    'read-later': 'Your Read Later list is empty.',
    hold: 'No books are on hold.',
    dropped: 'No dropped books found.',
    default: 'No books found in this section.',
  };

  return <StyledEmpty>{messages[status] || messages.default}</StyledEmpty>;
}

export default Empty;
