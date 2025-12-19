import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  margin-top: 1rem;
  width: 100%;
`;

const RatingSummary = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: var(--color-brand-700);
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  width: 100%;
`;

const BarLabel = styled.span`
  width: 1.5rem;
  font-weight: 600;
`;

const Bar = styled.div`
  flex: 1;
  height: 0.8rem;
  background: var(--color-grey-300);
  border-radius: 4px;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background: var(--color-brand-600);
  width: ${(props) => props.percent}%;
`;

const BarText = styled.span`
  min-width: 6rem;
  color: var(--color-grey-700);
`;

function RatingDistribution({ average, totalVotes, breakdown }) {
  const avg = average.toFixed(1);

  return (
    <RatingContainer>
      <RatingSummary>
        Rating ({avg} / 5.0, {totalVotes} votes)
      </RatingSummary>

      {Object.entries(breakdown)
        .sort(([a], [b]) => b - a)
        .map(([stars, count]) => {
          const percent = totalVotes ? (count / totalVotes) * 100 : 0;

          return (
            <BarRow key={stars}>
              <BarLabel>{stars}</BarLabel>
              <Bar>
                <BarFill percent={percent} />
              </Bar>
              <BarText>
                {percent.toFixed(0)}% ({count})
              </BarText>
            </BarRow>
          );
        })}
    </RatingContainer>
  );
}

export default RatingDistribution;
