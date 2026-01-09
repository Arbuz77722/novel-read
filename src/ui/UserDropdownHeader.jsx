import styled from 'styled-components';
import useProfile from '../features/profile/useProfile';
import { useUser } from '../features/authentication/useUser';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Username = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const UserEmail = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
`;

function UserDropdownHeader() {
  const { profile, isPending } = useProfile();
  const { user } = useUser();

  if (isPending || !profile || !user) return null;

  return (
    <Wrapper>
      <Avatar src={profile.avatar_url || '/placeholder-avatar.jpg'} />
      <Info>
        <Username>{profile.username}</Username>
        <UserEmail>{user?.user_metadata?.email}</UserEmail>
      </Info>
    </Wrapper>
  );
}

export default UserDropdownHeader;
