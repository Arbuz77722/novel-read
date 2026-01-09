import styled from 'styled-components';
import { format } from 'date-fns';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    var(--color-brand-50) 0%,
    var(--color-grey-100) 100%
  );
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
`;

const Avatar = styled.img`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid var(--color-grey-0);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
`;

const Username = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--color-brand-800);
  margin: 0 0 1rem 0;
`;

const InfoText = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-700);
  margin: 0.8rem 0;
`;

const JoinDate = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-style: italic;
`;

function ProfileInfo({ user, profile }) {
  return (
    <ProfileContainer>
      <Avatar
        src={profile?.avatar_url || '/placeholder-avatar.jpg'}
        alt={profile?.username}
      />
      <Username>@{profile?.username}</Username>
      <InfoText>{user?.email}</InfoText>
      <JoinDate>
        Member since {format(profile.created_at, 'dd MMMM yyyy')}
      </JoinDate>
    </ProfileContainer>
  );
}

export default ProfileInfo;
