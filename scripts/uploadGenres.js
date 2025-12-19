import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = 'https://kgozoiahigeetbrpchzb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnb3pvaWFoaWdlZXRicnBjaHpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjgyMDA5NywiZXhwIjoyMDcyMzk2MDk3fQ.m0n5g2XYvF-kHpBiQm3unC7xBfdua7mJhR9JVOtuHQ4';
const supabase = createClient(supabaseUrl, supabaseKey);

// List of genres
const genres = [
  'Action',
  'Adult',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Gender Bender',
  'Harem',
  'Historical',
  'Horror',
  'Josei',
  'Martial Arts',
  'Mature',
  'Mecha',
  'Mystery',
  'Psychological',
  'Romance',
  'School Life',
  'Sci-fi',
  'Seinen',
  'Shoujo',
  'Shoujo Ai',
  'Shounen',
  'Shounen Ai',
  'Slice of Life',
  'Smut',
  'Sports',
  'Supernatural',
  'Tragedy',
  'Wuxia',
  'Xianxia',
  'Xuanhuan',
  'Yaoi',
  'Yuri',
];

async function insertGenres() {
  const { data, error } = await supabase
    .from('genres')
    .insert(genres.map((name) => ({ name })));

  if (error) {
    console.log('Error inserting genres:', error.message);
  } else {
    console.log('✅ All genres inserted!');
    console.log(data);
  }
}

insertGenres();
