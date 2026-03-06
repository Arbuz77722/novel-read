import supabase from './supabase';

export async function getRootComments({
  targetType,
  targetId,
  page,
  pageSize,
}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('book_comments')
    .select(
      `*, 
       profiles(username, avatar_url, created_at, role),
       replies:book_comments!parent_id(count),
       votes:comment_votes!comment_id(vote, user_id)`,
      { count: 'exact' }
    )
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .is('parent_id', null)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  const transformed = data.map((comment) => {
    const votes = comment.votes || [];

    const upvotes = votes.filter((v) => v.vote === 1).length;
    const downvotes = votes.filter((v) => v.vote === -1).length;
    const myVote = votes.find((v) => v.user_id === currentUserId)?.vote ?? 0;

    return {
      ...comment,
      reply_count: comment.replies?.[0]?.count ?? 0,
      upvotes,
      downvotes,
      myVote,
      votes: undefined,
      replies: undefined,
    };
  });

  return { data: transformed, count };
}

export async function getReplies(parentId) {
  const { data, error } = await supabase
    .from('book_comments')
    .select(
      `*, 
       profiles(username, avatar_url, created_at, role),
        replies:book_comments!parent_id(count),
       votes:comment_votes!comment_id(vote, user_id)`
    )
    .eq('parent_id', parentId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentUserId = user?.id;

  return (data || []).map((comment) => {
    const votes = comment.votes || [];
    const upvotes = votes.filter((v) => v.vote === 1).length;
    const downvotes = votes.filter((v) => v.vote === -1).length;
    const myVote = votes.find((v) => v.user_id === currentUserId)?.vote ?? 0;

    return {
      ...comment,
      reply_count: comment.replies?.[0]?.count ?? 0,
      upvotes,
      downvotes,
      myVote,
      votes: undefined,
    };
  });
}
export async function createComment({
  targetId,
  targetType,
  comment,
  parentId = null,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('book_comments')
    .insert({
      user_id: user.id,
      target_type: targetType,
      target_id: targetId,
      parent_id: parentId,
      comment,
    })
    .select(`*, profiles(id, avatar_url, username)`)
    .single();
  if (error) throw new Error(error.message);

  return data;
}

export async function voteOnComments(commentId, vote) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('Login required');

  if (vote === null) {
    const { error } = await supabase
      .from('comment_votes')
      .delete()
      .eq('user_id', user.id)
      .eq('comment_id', commentId);

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return;
  }

  if (vote !== 1 && vote !== -1) {
    throw new Error('Invalid vote value');
  }

  const { error } = await supabase.from('comment_votes').upsert(
    {
      user_id: user.id,
      comment_id: commentId,
      vote,
    },
    { onConflict: 'user_id,comment_id' }
  );

  if (error) throw error;
}
