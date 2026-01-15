import supabase from './supabase';

export async function signupApi({ fullName, userName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, userName },
    },
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('User not created');

  return { user: data.user };
}

export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}
export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, username, avatar }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error('User not authenticated');

  if (password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password,
    });
    if (passwordError) throw new Error(passwordError.message);
  }

  let avatarUrl;
  if (avatar) {
    const fileExt = avatar.name.split('.').pop();
    const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar, {
        upsert: true,
        contentType: avatar.type,
      });

    if (uploadError) {
      if (uploadError.error === 'Duplicate') {
      } else {
        throw new Error(uploadError.message);
      }
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
    avatarUrl = data.publicUrl;
  }

  if (username && !username.trim()) {
    throw new Error('Username cannot be empty');
  }

  const updates = {
    ...(username && { username: username.trim() }),
    ...(avatarUrl && { avatar_url: avatarUrl }),
  };

  if (Object.keys(updates).length > 0) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (profileError) {
      if (profileError.code === '23505') {
        throw new Error('This username is already taken');
      }
      throw new Error(profileError.message || 'Failed to update profile');
    }
  }

  return { success: true };
}
