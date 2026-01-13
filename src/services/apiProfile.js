import supabase from './supabase';

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Profile fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return profile;
}

export async function addToLibrary({ bookId, status }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from('libraries').upsert(
    {
      user_id: user.id,
      book_id: bookId,
      status,
    },
    { onConflict: 'user_id,book_id' }
  );
  if (error) {
    console.error('Profile fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to update the library: ${error.message}`);
  }
}

export async function getLibrary() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error('Auth failed');
  }
  const { data: library, error } = await supabase
    .from('libraries')
    .select(
      `
      user_id,
      book_id,
      status,
      updated_at,
      last_read_chapter_id,
      books:books!inner (
        id,
        title,
        cover_url,
        slug,
        chapter_count,
        avg_rating,
        rating_count,
        latest_chapter_id,
        latest_chapter_at,
        first_chapter_id
      ),
      chapters:chapters(number)
    `
    )
    .eq('user_id', user.id);
  if (error) {
    console.error('Profile fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch library: ${error.message}`);
  }

  return library;
}

export async function updateLastReadChapter({ bookId, chapterId }) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) {
    if (authError || !user) return;
  }

  const { data: libraryEntry, error: fetchError } = await supabase
    .from('libraries')
    .select('id')
    .eq('book_id', bookId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (fetchError || !libraryEntry) return;

  const { error: updateError } = await supabase
    .from('libraries')
    .update({
      last_read_chapter_id: chapterId,
      updated_at: new Date(),
    })
    .eq('user_id', user.id)
    .eq('book_id', bookId);
  if (updateError) {
    console.error('Failed to update reading progress:', updateError);
    throw new Error(updateError.message);
  }
}

export async function getLastReadChapter(bookId) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error('Auth failed');
  }
  const { data, error } = await supabase
    .from('libraries')
    .select('last_read_chapter_id', 'chapters:chapters!inner(number)')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();

  if (error) {
    console.error('Last read chapter fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch the last read chapter: ${error.message}`);
  }
  return data;
}

export async function getLibraryEntry(bookId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('libraries')
    .select('status, last_read_chapter_id')
    .eq('user_id', user.id)
    .eq('book_id', bookId)
    .maybeSingle();

  if (error) throw error;

  return data;
}
