import StyledItemActive from '../../ui/StyledItemActive';

function GenreItem({ name, active, onClick }) {
  return (
    <StyledItemActive active={active} onClick={onClick}>
      {name}
    </StyledItemActive>
  );
}

export default GenreItem;
