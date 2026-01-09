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

const AvatarRowSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const AvatarSkeleton = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 2px solid #eee;
`;

const ButtonRowSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

function UpdateUserNameFormSkeleton() {
  return (
    <StyledForm>
      <TitleSkeleton>
        <Skeleton width={200} height={32} />
      </TitleSkeleton>

      <FormRowSkeleton>
        <Skeleton width={100} height={16} />
        <Skeleton width='100%' height={48} />
      </FormRowSkeleton>

      <FormRowSkeleton>
        <Skeleton width={100} height={16} />
        <Skeleton width='100%' height={48} />
      </FormRowSkeleton>

      <FormRowSkeleton>
        <Skeleton width={120} height={16} />
        <AvatarRowSkeleton>
          <AvatarSkeleton>
            <Skeleton circle width={80} height={80} />
          </AvatarSkeleton>
          <div>
            <Skeleton width={200} height={48} />
            <Skeleton width={150} height={12} style={{ marginTop: '0.5rem' }} />
          </div>
        </AvatarRowSkeleton>
      </FormRowSkeleton>

      <ButtonRowSkeleton>
        <Skeleton width={100} height={48} borderRadius={8} />
        <Skeleton width={160} height={48} borderRadius={8} />
      </ButtonRowSkeleton>
    </StyledForm>
  );
}

export default UpdateUserNameFormSkeleton;
