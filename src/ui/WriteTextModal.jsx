import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  margin-top: 1rem;
  width: 100%;
  min-height: 160px;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-brand-100);
  font-size: 1.5rem;
  resize: vertical;
  color: var(--color-grey-200);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function WriteTextModal({
  label,
  placeholder,
  submitLabel,
  onSubmit,
  onClose,
  onCancel,
  isSubmitting,
}) {
  const [text, setText] = useState('');

  const handleCancel = onCancel || onClose;

  return (
    <Container>
      <div>
        <Label>{label}</Label>
        <TextArea
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <ButtonGroup>
        <Button variation='secondary' onClick={handleCancel}>
          Cancel
        </Button>

        <Button
          disabled={isSubmitting || !text.trim()}
          onClick={() => onSubmit(text)}
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default WriteTextModal;
