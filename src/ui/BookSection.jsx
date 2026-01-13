import styled from 'styled-components';
import StyledHeading from './StyledHeading';
import Empty from './Empty';
import BookGrid from './BookGrid';

const TableTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export default function BookSection({
  heading,
  ItemComponent,
  tableTitle,
  books = [],
  onBookClick,
  variant = 'ongoing',
  gap,
  to,
  display,
  justify,
}) {
  if (!books?.length) {
    return <Empty resourceName='books' />;
  }

  return (
    <>
      {heading && (
        <StyledHeading
          heading={heading}
          display={display}
          justify={justify}
          to={to}
        />
      )}

      {tableTitle && <TableTitle>{tableTitle}</TableTitle>}

      <BookGrid variant={variant} gap={gap}>
        {books.map((book) => (
          <ItemComponent key={book.id} book={book} onBookClick={onBookClick} />
        ))}
      </BookGrid>
    </>
  );
}
