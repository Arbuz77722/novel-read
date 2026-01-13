import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import LoadMore from '../../ui/LoadMore';
import { PAGE_SIZE } from '../../utils/constants';
import useComments from './useComments';
import CommentSectionSkeleton from '../../ui/skeletons/CommentSectionSkeleton';
import { useLocation } from 'react-router-dom';

const StyledCommentSection = styled.section`
  background-color: var(--color-grey-0);
  padding: 2rem;
  border-radius: 5px;
`;
const Message = styled.p`
  margin-bottom: 2rem;
`;

function CommentSection({ targetId, targetType, expandCommentId }) {
  const [page, setPage] = useState(1);

  const { comments, count, isPending } = useComments({
    targetId,
    targetType,
    page,
  });

  const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollTo) return;
    if (isPending) return;

    const el = document.getElementById(location.state.scrollTo);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [location.state?.scrollTo, isPending, expandCommentId]);

  if (isPending) return <CommentSectionSkeleton />;

  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <StyledCommentSection>
      <CommentForm targetId={targetId} targetType={targetType} />

      {comments.length === 0 ? (
        <Message>No comments yet.</Message>
      ) : (
        <CommentList
          comments={comments}
          targetId={targetId}
          targetType={targetType}
          expandCommentId={expandCommentId}
        />
      )}

      {page < totalPages && (
        <LoadMore page={page} onPageChange={setPage} totalPages={totalPages} />
      )}
    </StyledCommentSection>
  );
}

export default CommentSection;
