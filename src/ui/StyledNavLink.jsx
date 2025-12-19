import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Base component: if "to" exists, render NavLink, else a div
const Base = ({ to, ...props }) => {
  if (to) return <NavLink to={to} {...props} />;
  return <div {...props} />;
};

const StyledNavLink = styled(Base)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
  color: var(--color-grey-600);
  transition: all 0.3s;

  &.active {
    color: var(--color-brand-0);
    background-color: var(--color-brand-800);
    border-radius: var(--border-radius-sm);
  }

  &:hover {
    color: var(--color-grey-800);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

export default StyledNavLink;
