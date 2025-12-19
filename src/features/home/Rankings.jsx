import styled from 'styled-components';
import BookSection from '../../ui/BookSection';
import RankingBookItem from '../../ui/RankingBookItem';
import StyledHeading from '../../ui/StyledHeading';
import Spinner from '../../ui/Spinner';
import { useBooks } from '../books/useBooks';
import { useBookNavigation } from '../../hooks/useBookNavigation';

const StyledRanking = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
`;

function Rankings() {
  const { goToBook } = useBookNavigation();
  const sections = [
    { title: 'Most Read', ranking: 'views', type: 'views' },
    { title: 'New Trends', ranking: 'trends', type: 'trends' },
    { title: 'Popular', ranking: 'rated', type: 'rated' },
  ];

  return (
    <>
      <StyledHeading
        heading='Rankings'
        to='/browse'
        display='flex'
        justify='space-between'
      />
      <StyledRanking>
        {sections.map(({ title, ranking, type }) => {
          const { books, isPending } = useBooks({ ranking, limit: 10 });
          return (
            <Section key={title}>
              {isPending ? (
                <Spinner />
              ) : (
                <BookSection
                  books={books}
                  ItemComponent={(props) => (
                    <RankingBookItem {...props} type={type} />
                  )}
                  tableTitle={title}
                  gridCols={1}
                  gap='1rem'
                  margin='0'
                  onBookClick={goToBook}
                />
              )}
            </Section>
          );
        })}
      </StyledRanking>
    </>
  );
}

export default Rankings;
