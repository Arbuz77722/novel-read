import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeadingAndBorder = styled.div`
  display: ${(props) => (props.display ? props.display : 'flex')};
  justify-content: ${(props) =>
    props.justify === 'center'
      ? 'center'
      : props.justify === 'space-around'
      ? 'space-around'
      : 'space-between'};
  flex-wrap: nowrap;
  padding-bottom: 1rem;
`;

const Heading = styled.h3`
  color: ${(props) =>
    props.color ? props.color : 'var(--color-grey-900, #111827)'};
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 1rem;
  ${(props) =>
    props.noWidth
      ? `
          display: inline-block;
          border-bottom: 2px solid ${
            props.borderColor
              ? props.borderColor
              : 'var(--color-grey-100, #e5e7eb)'
          };
          width: auto;
        `
      : `
          border-bottom: 2px solid ${
            props.borderColor
              ? props.borderColor
              : 'var(--color-grey-100, #e5e7eb)'
          };
          width: 100%;
        `}
`;

const StyledLink = styled(Link)`
  color: var(--color-brand-500, #3b82f6);
  font-weight: 500;
  text-decoration: none;
  font-size: 1.5rem;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    color: var(--color-brand-600, #2563eb);
  }
`;

function StyledHeading({
  heading,
  to,
  display,
  justify,
  noWidth,
  color,
  borderColor,
}) {
  return (
    <>
      <StyledHeadingAndBorder display={display} justify={justify}>
        <Heading noWidth={noWidth} color={color} borderColor={borderColor}>
          {heading}
        </Heading>
        {to && <StyledLink to={to}>View more</StyledLink>}
      </StyledHeadingAndBorder>
    </>
  );
}

export default StyledHeading;
