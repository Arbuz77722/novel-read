import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../../authentication/useUser';
import useProfile from '../useProfile';
import useUpdateUser from './useUpdateUser';
import Form from '../../../ui/Form';
import FormRow from '../../../ui/FormRow';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import FileInput from '../../../ui/FileInput';

const StyledForm = styled.div``;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const AvatarImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
`;

const FileInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
`;

const FileInputWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

function UpdateUserNameForm() {
  const { user } = useUser();
  const { profile } = useProfile();
  const { updateUser, isUploading } = useUpdateUser();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  if (!profile) return null;

  const hasChanges = username.trim() !== profile.username || avatar !== null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!hasChanges || !username.trim()) return;

    updateUser(
      { username: username.trim(), avatar },
      { onSuccess: () => setAvatar(null) }
    );
  }

  function handleCancel() {
    setUsername(profile.username);
    setAvatar(null);
  }

  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : profile.avatar_url || '/placeholder-avatar.jpg';

  return (
    <StyledForm>
      <Title>Update Profile</Title>

      <Form onSubmit={handleSubmit}>
        <FormRow label='Email address'>
          <Input value={user.email} disabled />
        </FormRow>

        <FormRow label='Username'>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isUploading}
          />
        </FormRow>

        <FormRow label='Avatar image'>
          <AvatarRow>
            <AvatarImage src={avatarPreview} alt='Avatar preview' />
            <FileInputWrapper>
              <FileInput
                accept='image/*'
                disabled={isUploading}
                onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
              />
              {avatar && <FileInfo>{avatar.name}</FileInfo>}
            </FileInputWrapper>
          </AvatarRow>
        </FormRow>

        <FormRow>
          <Button
            type='reset'
            variation='secondary'
            onClick={handleCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button disabled={!hasChanges || isUploading}>Update account</Button>
        </FormRow>
      </Form>
    </StyledForm>
  );
}

export default UpdateUserNameForm;
