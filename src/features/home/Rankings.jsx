import styled from 'styled-components';
import BookSection from '../../ui/BookSection';
import RankingBookItem from '../../ui/RankingBookItem';
import StyledHeading from '../../ui/StyledHeading';
import { useBookNavigation } from '../../hooks/useBookNavigation';
import RankingBookItemSkeleton from '../../ui/skeletons/RankingBookItemSkeleton';
import { useBooksByFilter } from '../books/useBooksByFilter';

const StyledRanking = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;

  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
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
        to='/browse?order=popular&page=1'
        display='flex'
        justify='space-between'
      />

      <StyledRanking>
        {sections.map(({ title, ranking, type }) => {
          const { books, isPending } = useBooksByFilter({
            ranking,
            limit: 10,
          });

          return (
            <Section key={title}>
              <BookSection
                books={books}
                tableTitle={title}
                variant='ranking'
                onBookClick={goToBook}
                ItemComponent={(props) =>
                  isPending ? (
                    <RankingBookItemSkeleton />
                  ) : (
                    <RankingBookItem {...props} type={type} />
                  )
                }
              />
            </Section>
          );
        })}
      </StyledRanking>
    </>
  );
}

export default Rankings;
