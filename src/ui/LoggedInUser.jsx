import styled from 'styled-components';
import useProfile from '../features/profile/useProfile';

const Avatar = styled.img`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 100px;
`;

const StyledLoggedInUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoggedUser = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-brand-600);
`;

function LoggedInUser() {
  const { profile, isPending } = useProfile();
  if (isPending || !profile) return null;

  return (
    <StyledLoggedInUser>
      <Avatar src={profile.avatar_url || '/placeholder-avatar.jpg'} />
      <LoggedUser>
        Hello, <span>{profile.username}</span>
      </LoggedUser>
    </StyledLoggedInUser>
  );
}

export default LoggedInUser;
