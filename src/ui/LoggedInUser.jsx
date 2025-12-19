import styled from 'styled-components';
import useProfile from '../features/profile/useProfile';

const Avatar = styled.img`
  height: 4.2rem;
  width: 4.2rem;
  border-radius: 100px;
`;

const StyledLoggedInUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

function LoggedInUser() {
  const { profile, isPending } = useProfile();
  if (isPending || !profile) return null;

  return (
    <StyledLoggedInUser>
      <Avatar src={profile.avatar_url || '/placeholder-avatar.jpg'} />
      <span>
        Hello, <span>{profile.username}</span>
      </span>
    </StyledLoggedInUser>
  );
}

export default LoggedInUser;
