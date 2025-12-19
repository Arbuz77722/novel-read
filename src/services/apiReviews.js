import supabase from './supabase';

export async function getBookReviews(bookId) {
  const { data, error } = await supabase
    .from('book_reviews')
    .select('*')
    .eq('book_id', bookId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function submitReview({
  bookId,
  userId,
  rating,
  review,
  writing_quality,
  plot_development,
  world_building,
  isSpoiler,
}) {
  const { data, error } = await supabase
    .from('book_reviews')
    .upsert(
      {
        book_id: bookId,
        user_id: userId,
        rating,
        review,
        writing_quality,
        plot_development,
        world_building,
        is_spoiler: isSpoiler,
        updated_at: new Date().toISOString(),
      },
      { onConflict: ['book_id', 'user_id'] }
    )
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// src/api/apiReviews.js

export async function getUserReviews(bookId, filter = 'newest') {
  let query = supabase
    .from('book_reviews')
    .select(
      `
      id,
      rating,
      review,
      created_at,
      profiles:profiles!book_reviews_user_id_fkey (
        username,
        avatar_url
      ),
      votes:review_votes!review_id (
        vote,
        user_id
      )
    `
    )
    .eq('book_id', bookId);

  const { data, error } = await query;
  if (error) throw error;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  const reviews = data.map((review) => {
    const upvotes = review.votes.filter((v) => v.vote === 1).length;
    const downvotes = review.votes.filter((v) => v.vote === -1).length;
    const score = upvotes - downvotes;
    const myVote =
      review.votes.find((v) => v.user_id === currentUserId)?.vote || null;

    return {
      ...review,
      upvotes,
      downvotes,
      score,
      myVote,
    };
  });

  return reviews.sort((a, b) => {
    if (filter === 'newest') return b.created_at.localeCompare(a.created_at);
    if (filter === 'oldest') return a.created_at.localeCompare(b.created_at);
    if (filter === 'most liked') return b.score - a.score;
    if (filter === 'most disliked') return b.downvotes - a.downvotes;
    return 0;
  });
}
export async function voteOnReview(reviewId, vote) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Login required');

  if (vote === null) {
    const { error } = await supabase
      .from('review_votes')
      .delete()
      .eq('user_id', user.id)
      .eq('review_id', reviewId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('review_votes')
      .upsert(
        { user_id: user.id, review_id: reviewId, vote },
        { onConflict: 'user_id,review_id' }
      );
    if (error) throw error;
  }
}
