import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  max-width: 100%;
  overflow: hidden;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: background-color 0.2s;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export default FileInput;
