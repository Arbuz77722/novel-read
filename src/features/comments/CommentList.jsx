import styled from 'styled-components';
import CommentItem from '../../ui/CommentItem';

const StyledCommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function CommentList({ comments, targetId, targetType, expandCommentId }) {
  return (
    <StyledCommentList>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          targetId={targetId}
          targetType={targetType}
          expandCommentId={expandCommentId}
        />
      ))}
    </StyledCommentList>
  );
}

export default CommentList;
