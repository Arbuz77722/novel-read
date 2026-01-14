import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  line-height: 1.7;
  background-color: var(--color-grey-50);

  @media (max-width: 640px) {
    padding: 2.4rem 1.6rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2.4rem;
  display: inline-block;
  border-bottom: 2px solid var(--color-grey-100);
  width: auto;
`;

const Section = styled.section`
  margin-bottom: 3.2rem;
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: var(--color-brand-500);
`;

const Text = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-700);
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin-left: 2rem;
  font-size: 1.5rem;
  color: var(--color-grey-700);

  li {
    margin-bottom: 0.6rem;
  }
`;

const Email = styled.a`
  color: var(--color-brand-600);
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export { Wrapper, Title, Section, Heading, Text, List, Email };
