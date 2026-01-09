import { getCurrentUserId } from '../utils/getCurrentUserId';
import supabase from './supabase';

export async function getUnreadNotificationCount() {
  const userId = await getCurrentUserId();

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', userId)
    .eq('is_read', false);

  if (error) throw new Error(error.message);

  return count || 0;
}

export async function getNotificationInbox(limit) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('notifications')
    .select(
      `
      id,
      type,
      book_id,
      is_read,
      created_at,
      comment_id, review_id,
      parent_comment_id,
      actor:profiles  !actor_id (
        id,
        username,
        avatar_url
      )
    `
    )
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data || [];
}

export async function getNotifications(page = 0, pageSize = 20) {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('notifications')
    .select(
      `
      id,
      type,
      book_id,
      is_read,
      created_at,
      comment_id, review_id,
      parent_comment_id,
      actor:profiles  !actor_id (
        id,
        username,
        avatar_url
      ),
      comment:book_comments!comment_id (comment),
      review:book_reviews!review_id (review)
    `
    )
    .eq('recipient_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data || [];
}

export async function markNotificationAsRead(notificationId) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function markAllNotificationsAsRead() {
  const userId = await getCurrentUserId();
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('recipient_id', userId)
    .eq('is_read', false);

  if (error) throw error;
}
