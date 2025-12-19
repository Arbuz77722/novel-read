import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';
import { CHAPTERS_PAGE_SIZE } from '../utils/constants';

export async function getBooks({
  status,
  orderBy,
  limit,
  page = 1,
  query: searchQuery,
  genres,
  types,
  languages,
  ranges,
  sort,
  genreMode = 'and',
  includeTags = [],
  excludeTags = [],
  ratingMin,
  ratingMax,
  ranking,
}) {
  const genreIds = genres?.filter((g) => g !== 'all').map(Number);
  const { min: minChapter, max: maxChapter } = ranges || {};

  let bookIds = null;

  // ----- GENRES -----
  if (genreIds?.length > 0) {
    const { data: genreMatches, error: genreError } = await supabase
      .from('book_genres')
      .select('book_id')
      .in('genre_id', genreIds);

    if (genreError) {
      console.error('Genre filter error:', genreError);
      throw new Error('Failed to filter by genre');
    }

    if (genreMode === 'and') {
      const countMap = {};
      genreMatches.forEach((g) => {
        countMap[g.book_id] = (countMap[g.book_id] || 0) + 1;
      });

      bookIds = Object.keys(countMap).filter(
        (bookId) => countMap[bookId] === genreIds.length
      );
    } else {
      // OR logic
      bookIds = [...new Set(genreMatches.map((g) => g.book_id))];
    }

    if (bookIds.length === 0) return { books: [], count: 0 };
  }

  // ----- INCLUDE TAGS -----
  if (includeTags?.length > 0) {
    const { data: included, error: includeError } = await supabase
      .from('book_tags')
      .select('book_id')
      .in('tag_id', includeTags);

    if (includeError) {
      console.error('Include tags error:', includeError);
      throw new Error('Failed to filter include tags');
    }

    const includedIds = [...new Set(included.map((t) => t.book_id))];
    bookIds = bookIds
      ? bookIds.filter((id) => includedIds.includes(id))
      : includedIds;

    if (bookIds.length === 0) return { books: [], count: 0 };
  }

  // ----- EXCLUDE TAGS -----
  if (excludeTags?.length > 0) {
    const { data: excluded, error: excludeError } = await supabase
      .from('book_tags')
      .select('book_id')
      .in('tag_id', excludeTags);

    if (excludeError) {
      console.error('Exclude tags error:', excludeError);
      throw new Error('Failed to filter exclude tags');
    }

    const excludedIds = new Set(excluded.map((t) => t.book_id));

    if (bookIds) {
      // exclude from filtered bookIds
      bookIds = bookIds.filter((id) => !excludedIds.has(id));
    } else {
      // fetch all book IDs from books table and exclude
      const { data: allBooks } = await supabase.from('books').select('id');
      bookIds = allBooks.map((b) => b.id).filter((id) => !excludedIds.has(id));
    }

    if (bookIds.length === 0) return { books: [], count: 0 };
  }

  // ----- MAIN BOOK QUERY -----
  let query = supabase
    .from('books')
    .select('*, book_genres!inner(genre_id), genres(id, name)', {
      count: 'exact',
    });

  if (bookIds?.length > 0) {
    query = query.in('id', bookIds);
  }

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (ranking === 'views') {
    query = query.order('views', { ascending: false });
  } else if (ranking === 'rated') {
    query = query
      .order('rating_count', { ascending: false })
      .order('avg_rating', { ascending: false });
  } else if (ranking === 'trends') {
    query = query
      .order('weekly_ratings', { ascending: false })
      .order('weekly_views', { ascending: false });
  }

  const sortDirection = sort?.toLowerCase() === 'asc';
  if (orderBy?.toLowerCase() === 'new') {
    query = query.order('created_at', { ascending: sortDirection });
  } else if (orderBy?.toLowerCase() === 'popular') {
    query = query.order('views', { ascending: sortDirection });
  } else if (orderBy?.toLowerCase() === 'updates') {
    query = query.order('latest_chapter_at', { ascending: sortDirection });
  }

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  if (types?.length > 0) {
    query = query.in('type', types);
  }

  if (languages?.length > 0) {
    query = query.in('language', languages);
  }

  if (minChapter) {
    query = query.gte('chapter_count', minChapter);
  }

  if (maxChapter) {
    query = query.lte('chapter_count', maxChapter);
  }

  // ----- RATING FILTER -----
  if (ratingMin) {
    query = query.gte('rating', ratingMin);
  }
  if (ratingMax) {
    query = query.lte('rating', ratingMax);
  }

  // ----- PAGINATION -----
  const from = (page - 1) * PAGE_SIZE;
  const to = limit ? from + limit - 1 : from + PAGE_SIZE - 1;
  query = query.range(from, to);

  if (limit) {
    query = query.limit(limit);
  }

  // ----- SORT -----
  // if (orderBy && sort) {
  //   query = query.order(orderBy, { ascending: sort === 'asc' });
  // }

  const { data: books, error, count } = await query;

  if (error) {
    console.error('Books fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch books: ${error.message}`);
  }

  const transformedBooks = books.map((book) => ({
    ...book,
    genre_ids: book.book_genres?.map((bg) => bg.genre_id) || [],
    genres: book.genres || [],
  }));
  return {
    books: transformedBooks || [],
    count: count || 0,
  };
}

export async function getGenres() {
  const { data: genres, error } = await supabase.from('genres').select('*');
  if (error) {
    console.error('Genre fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch genres: ${error.message}`);
  }

  return genres;
}

export async function getChapters({ bookId, page }) {
  if (!bookId) throw new Error('Book ID is required');

  let query = supabase
    .from('chapters')
    .select('id, title, number, created_at', { count: 'exact' })
    .eq('book_id', bookId)
    .eq('is_meta', false)
    .order('number', { ascending: true });

  if (page) {
    const from = (page - 1) * CHAPTERS_PAGE_SIZE;
    const to = from + CHAPTERS_PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Chapter fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch chapters: ${error.message}`);
  }

  return { chapters: data || [], count: count || 0 };
}

export async function getLatestChapter(chapterId) {
  if (!chapterId) return null;
  const { data, error } = await supabase
    .from('chapters')
    .select('title')
    .eq('id', chapterId)
    .single();

  if (error) {
    console.error('Chapter fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch chapter: ${error.message}`);
  }

  return data;
}
export async function getBook(slug) {
  const { data: book, error } = await supabase
    .from('books')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Book fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch book: ${error.message}`);
  }

  return book;
}

export async function getChapter(bookId, chapterId) {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('book_id', bookId)
    .eq('id', chapterId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getSearchResults(query) {
  if (!query || query.trim().length < 3) return [];
  const { data, error } = await supabase
    .from('books')
    .select('id, title, cover_url, slug')
    .ilike('title', `%${query}%`)
    .limit(10);

  if (error) throw new Error(error.message);
  return data;
}

export async function getTags() {
  const { data: tags, error } = await supabase.from('tags').select('*');
  if (error) {
    console.error('Tags fetch error:', {
      message: error.message,
      details: error.details,
    });
    throw new Error(`Failed to fetch genres: ${error.message}`);
  }

  return tags;
}
export async function getBookGenre(bookId) {
  const { data, error } = await supabase
    .from('books')
    .select(
      `
      *,
      book_genres!inner(genre_id),
      genres(id, name)
    `
    )
    .eq('id', bookId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch book: ${error.message}`);
  }
  return {
    ...data,
    genre_ids: data.book_genres?.map((bg) => bg.genre_id) || [],
    genres: data.genres || [],
  };
}

export async function getBookTags(bookId) {
  const { data, error } = await supabase
    .from('books')
    .select(
      `
      *,
      book_tags!inner(tag_id),
      tags(id, name)
    `
    )
    .eq('id', bookId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch tags: ${error.message}`);
  }

  // Transform for easier use
  return {
    ...data,
    tag_ids: data.book_tags?.map((bt) => bt.tag_id) || [],
    tags: data.tags || [],
  };
}

export async function addBookViews({ bookId, userId = null }) {
  const { data, error } = await supabase
    .from('book_views')
    .insert([{ book_id: bookId, user_id: userId }]);
  if (error) {
    console.error('Supabase insert error:', error); //
    throw new Error(error.message);
  }
  return data;
}
