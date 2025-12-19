import styled from 'styled-components';
import StyledHeading from './StyledHeading';
import Empty from './Empty';

const TableTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StyledGrid = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  padding: 0;
  margin: ${(props) => props.margin || '0 0 4rem 0'};
  grid-template-columns: ${(props) =>
    props.gridCols ? `repeat(${props.gridCols}, 1fr)` : 'repeat(6, 1fr)'};
  grid-template-rows: ${(props) =>
    props.gridRows ? props.gridRows : 'repeat(2, 1fr)'};
  gap: ${(props) => props.gap || '1rem'};
`;

function BookSection({
  heading,
  ItemComponent,
  tableTitle,
  gridCols,
  gridRows,
  gap = '1rem',
  margin = '0 0 4rem 0',
  display,
  justify,
  to,
  books = [],
  onBookClick,
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
      {ItemComponent && (
        <StyledGrid
          gridCols={gridCols}
          gridRows={gridRows}
          gap={gap}
          margin={margin}
        >
          {books.map((book) => (
            <ItemComponent
              key={book.id}
              book={book}
              onBookClick={onBookClick}
            />
          ))}
        </StyledGrid>
      )}
    </>
  );
}

export default BookSection;
