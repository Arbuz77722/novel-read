import { getCurrentUserId } from '../utils/getCurrentUserId';
import supabase from './supabase';

export async function getUserStats() {
  const userId = await getCurrentUserId();

  const [{ data: comments }, { data: reviews }] = await Promise.all([
    supabase.from('book_comments').select('id').eq('user_id', userId),
    supabase.from('book_reviews').select('id').eq('user_id', userId),
  ]);

  const commentIds = comments?.map((comment) => comment.id);
  const reviewIds = reviews?.map((review) => review.id);

  const [
    { count: totalComments },
    { count: commentLikes },
    { count: commentDislikes },
    { count: totalReviews },
    { count: reviewLikes },
    { count: reviewDislikes },
    { data: libraryRows, error: libraryError },
  ] = await Promise.all([
    supabase
      .from('book_comments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),

    commentIds
      ? supabase
          .from('comment_votes')
          .select('id', { count: 'exact', head: true })
          .eq('vote', 1)
          .in('comment_id', commentIds)
      : Promise.resolve({ count: 0 }),

    commentIds
      ? supabase
          .from('comment_votes')
          .select('id', { count: 'exact', head: true })
          .eq('vote', -1)
          .in('comment_id', commentIds)
      : Promise.resolve({ count: 0 }),

    supabase
      .from('book_reviews')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId),

    reviewIds
      ? supabase
          .from('review_votes')
          .select('id', { count: 'exact', head: true })
          .eq('vote', 1)
          .in('review_id', reviewIds)
      : Promise.resolve({ count: 0 }),

    reviewIds
      ? supabase
          .from('review_votes')
          .select('id', { count: 'exact', head: true })
          .eq('vote', -1)
          .in('review_id', reviewIds)
      : Promise.resolve({ count: 0 }),

    supabase.from('libraries').select('status').eq('user_id', userId),
  ]);

  if (libraryError) throw libraryError;

  const libraryStats = (libraryRows || []).reduce(
    (acc, row) => {
      acc.all++;
      if (row.status in acc) {
        acc[row.status]++;
      }
      return acc;
    },
    {
      all: 0,
      reading: 0,
      completed: 0,
      read_later: 0,
      hold: 0,
      dropped: 0,
    }
  );

  return {
    comments: {
      total: totalComments || 0,
      likes: commentLikes || 0,
      dislikes: commentDislikes || 0,
    },
    reviews: {
      total: totalReviews || 0,
      likes: reviewLikes || 0,
      dislikes: reviewDislikes || 0,
    },
    library: libraryStats,
  };
}
