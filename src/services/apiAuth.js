import generateRandomAvatar from '../utils/generateAvatar';
import supabase from './supabase';

export async function signupApi({ fullName, userName, email, password }) {
  // 1. Signup
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, userName },
    },
  });

  if (authError) throw new Error(authError.message);
  if (!authData.user) throw new Error('User not created');

  const userId = authData.user.id;
  const avatar_url = generateRandomAvatar(userName);
  console.log('Generated avatar:', avatar_url);

  const { data: existingProfile, error: existingError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  // 3. If no profile exists, insert it
  if (!existingProfile) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: userId,
        username: userName,
        avatar_url,
        bio: null,
      },
    ]);

    if (profileError) throw new Error(profileError.message);
  }

  return { user: authData.user };
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

// services/apiAuth.js (or wherever updateCurrentUser is)

export async function updateCurrentUser({ password, username, avatar }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error('User not authenticated');

  // 1. Update password if provided
  if (password) {
    const { error: passwordError } = await supabase.auth.updateUser({
      password,
    });
    if (passwordError) throw new Error(passwordError.message);
  }

  // 2. Upload avatar if provided – use unique filename
  let avatarUrl;
  if (avatar) {
    const fileExt = avatar.name.split('.').pop();
    // Unique per upload → forces new URL every time
    const fileName = `avatar-${user.id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar, {
        upsert: true,
        contentType: avatar.type,
      });

    if (uploadError) {
      if (uploadError.error === 'Duplicate') {
        // File already exists (rare with timestamp), just reuse URL
      } else {
        throw new Error(uploadError.message);
      }
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
    avatarUrl = data.publicUrl;
  }

  // 3. Prepare profile updates
  if (username && !username.trim()) {
    throw new Error('Username cannot be empty');
  }

  const updates = {
    ...(username && { username: username.trim() }),
    ...(avatarUrl && { avatar_url: avatarUrl }), // no need for ?v= cache busting anymore
  };

  // 4. Update profiles table if anything changed
  if (Object.keys(updates).length > 0) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (profileError) {
      if (profileError.code === '23505') {
        // Unique violation = username taken
        throw new Error('This username is already taken');
      }
      throw new Error(profileError.message || 'Failed to update profile');
    }
  }

  return { success: true };
}
