import supabase from '../services/supabase';

export async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  if (!data?.user) throw new Error('User not authenticated');

  return data.user.id;
}
