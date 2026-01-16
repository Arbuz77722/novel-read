import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  max-width: 42rem;
`;

function EmptyState({ title, description }) {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}

export default EmptyState;
