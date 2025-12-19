import styled from 'styled-components';

export const MiniSpinner = styled.div`
  position: absolute;
  right: 28px;
  width: 14px;
  height: 14px;
  border: 2px solid #ccc;
  border-top-color: #0077ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
