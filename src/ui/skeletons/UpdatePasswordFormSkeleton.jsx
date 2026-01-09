import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledForm = styled.div``;

const TitleSkeleton = styled.div`
  margin-bottom: 1rem;
`;

const FormRowSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ButtonRowSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

function UpdatePasswordFormSkeleton() {
  return (
    <StyledForm>
      <TitleSkeleton>
        <Skeleton width={200} height={32} />
      </TitleSkeleton>

      <FormRowSkeleton>
        <Skeleton width={150} height={16} />
        <Skeleton width='100%' height={48} />
        <Skeleton width={200} height={12} />
      </FormRowSkeleton>

      <FormRowSkeleton>
        <Skeleton width={120} height={16} />
        <Skeleton width='100%' height={48} />
        <Skeleton width={250} height={12} />
      </FormRowSkeleton>

      <ButtonRowSkeleton>
        <Skeleton width={100} height={48} borderRadius={8} />
        <Skeleton width={160} height={48} borderRadius={8} />
      </ButtonRowSkeleton>
    </StyledForm>
  );
}

export default UpdatePasswordFormSkeleton;
