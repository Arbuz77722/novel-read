import styled from 'styled-components';
import StyledHeading from './StyledHeading';

const StyledUserStats = styled.section`
  max-width: 90rem;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const StatCard = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 12px;
  padding: 3rem 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const FullWidthStatCard = styled(StatCard)`
  grid-column: 1 / -1;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  color: var(--color-brand-700);
  margin-bottom: 2.5rem;
  font-weight: 600;
`;

const NumbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const LibraryGrid = styled(NumbersGrid)`
  grid-template-columns: repeat(6, 1fr);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 500;
`;

const Value = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-brand-800);
`;

function UserStats({ stats }) {
  return (
    <StyledUserStats>
      <StyledHeading noWidth heading='Activity Overview' />

      <StatsGrid>
        <StatCard>
          <CardTitle>Comments</CardTitle>
          <NumbersGrid>
            <StatItem>
              <Label>Total</Label>
              <Value>{stats.comments.total}</Value>
            </StatItem>
            <StatItem>
              <Label>Likes</Label>
              <Value>{stats.comments.likes}</Value>
            </StatItem>
            <StatItem>
              <Label>Dislikes</Label>
              <Value>{stats.comments.dislikes}</Value>
            </StatItem>
          </NumbersGrid>
        </StatCard>
        <StatCard>
          <CardTitle>Reviews</CardTitle>
          <NumbersGrid>
            <StatItem>
              <Label>Total</Label>
              <Value>{stats.reviews.total}</Value>
            </StatItem>
            <StatItem>
              <Label>Likes</Label>
              <Value>{stats.reviews.likes}</Value>
            </StatItem>
            <StatItem>
              <Label>Dislikes</Label>
              <Value>{stats.reviews.dislikes}</Value>
            </StatItem>
          </NumbersGrid>
        </StatCard>
        <FullWidthStatCard>
          <CardTitle>Library</CardTitle>
          <LibraryGrid>
            <StatItem>
              <Label>All</Label>
              <Value>{stats.library.all}</Value>
            </StatItem>
            <StatItem>
              <Label>Reading</Label>
              <Value>{stats.library.reading}</Value>
            </StatItem>
            <StatItem>
              <Label>Completed</Label>
              <Value>{stats.library.completed}</Value>
            </StatItem>
            <StatItem>
              <Label>Read Later</Label>
              <Value>{stats.library.read_later}</Value>
            </StatItem>
            <StatItem>
              <Label>On Hold</Label>
              <Value>{stats.library.hold}</Value>
            </StatItem>
            <StatItem>
              <Label>Dropped</Label>
              <Value>{stats.library.dropped}</Value>
            </StatItem>
          </LibraryGrid>
        </FullWidthStatCard>
      </StatsGrid>
    </StyledUserStats>
  );
}

export default UserStats;
