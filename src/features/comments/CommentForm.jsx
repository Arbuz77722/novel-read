import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../authentication/useUser';
import useCreateComment from './useCreateComment';
import WriteTextModal from '../../ui/WriteTextModal';

const Wrapper = styled.div`
  margin-bottom: 3.2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function CommentForm({ targetId, targetType }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const { createComment, isPending } = useCreateComment({
    targetType,
    targetId,
  });

  function handleSubmit(text) {
    console.log('SUBMIT CLICKED:', text);
    createComment({ comment: text }, { onSuccess: () => setOpen(false) });
  }

  function handleOpen() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setOpen(true);
  }

  return (
    <Wrapper>
      <Header>
        <h2>User Comments</h2>
        <Button onClick={handleOpen}>Write a comment</Button>
      </Header>

      {open && (
        <WriteTextModal
          label='Your Comment'
          placeholder='Write your comment...'
          submitLabel='Post Comment'
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isSubmitting={isPending}
        />
      )}
    </Wrapper>
  );
}

export default CommentForm;
