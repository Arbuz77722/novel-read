import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Base = ({ to, end, ...props }) => {
  if (to) return <NavLink end={end} to={to} {...props} />;
  return <div {...props} />;
};

const StyledNavLink = styled(Base)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-sm);

  color: var(--color-grey-600);
  transition: background-color 0.2s, color 0.2s;

  &.active {
    color: var(--color-brand-600);
  }

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-400);
    transition: color 0.2s;
  }

  &.active svg {
    color: var(--color-brand-600);
  }
`;

export default StyledNavLink;
