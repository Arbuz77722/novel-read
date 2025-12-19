import { HiEye } from 'react-icons/hi';
import { HiBookmarkSquare } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledNewTrendingBooksItem = styled.li`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  width: 40px;
  height: 50px;
`;

const StyledTitle = styled.h6`
  font-size: 1.2rem;
`;

const StyledStats = styled.div`
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

function NewTrendingBooksItem({ book }) {
  const { cover_url: cover, title, views } = book;
  return (
    <StyledNewTrendingBooksItem>
      <StyledImg src={cover} alt={`cover of ${title}`} />
      <StyledDiv>
        <StyledTitle>{title}</StyledTitle>
        <StyledStats>
          <HiEye />
          <span>{views} views</span>
        </StyledStats>
        <StyledStats>
          <HiBookmarkSquare />
          <span>22.3K</span>
        </StyledStats>
      </StyledDiv>
    </StyledNewTrendingBooksItem>
  );
}

export default NewTrendingBooksItem;
