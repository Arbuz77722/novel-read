import styled from 'styled-components';

import UpdateUserNameForm from './edit/UpdateUserNameForm';
import UpdatePasswordForm from './edit/UpdateUserPasswordForm';

const StyledEdit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

function ProfileEdit() {
  return (
    <StyledEdit>
      <UpdateUserNameForm />
      <UpdatePasswordForm />
    </StyledEdit>
  );
}

export default ProfileEdit;
