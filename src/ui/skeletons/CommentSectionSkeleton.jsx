import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledCommentSection = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--color-grey-100);
`;

const CommentFormSkeleton = styled.div`
  margin-bottom: 2rem;
`;

const CommentListSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CommentSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--color-grey-0);
`;

const AvatarSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const CommentContentSkeleton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LoadMoreSkeleton = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

function CommentSectionSkeleton() {
  return (
    <StyledCommentSection>
      <CommentFormSkeleton>
        <Skeleton width='100%' height={48} borderRadius={8} />
      </CommentFormSkeleton>

      <CommentListSkeleton>
        {Array(4)
          .fill()
          .map((_, i) => (
            <CommentSkeleton key={i}>
              <AvatarSkeleton>
                <Skeleton circle width={40} height={40} />
              </AvatarSkeleton>
              <CommentContentSkeleton>
                <Skeleton width='60%' height={16} />
                <Skeleton width='100%' height={12} />
                <Skeleton width='80%' height={12} />
              </CommentContentSkeleton>
            </CommentSkeleton>
          ))}
      </CommentListSkeleton>

      <LoadMoreSkeleton>
        <Skeleton width={120} height={40} borderRadius={8} />
      </LoadMoreSkeleton>
    </StyledCommentSection>
  );
}

export default CommentSectionSkeleton;
