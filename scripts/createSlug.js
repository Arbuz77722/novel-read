import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = 'https://kgozoiahigeetbrpchzb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnb3pvaWFoaWdlZXRicnBjaHpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjgyMDA5NywiZXhwIjoyMDcyMzk2MDk3fQ.m0n5g2XYvF-kHpBiQm3unC7xBfdua7mJhR9JVOtuHQ4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word characters
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/--+/g, '-'); // replace multiple - with single -
}

async function updateSlugs() {
  // Fetch all books
  const { data: books, error } = await supabase
    .from('books')
    .select('id, title');
  if (error) {
    console.error('Error fetching books:', error);
    return;
  }

  // Update each book with a slug
  for (const book of books) {
    const slug = generateSlug(book.title);

    const { error: updateError } = await supabase
      .from('books')
      .update({ slug })
      .eq('id', book.id);

    if (updateError) {
      console.error(`Error updating book ${book.id}:`, updateError);
    } else {
      console.log(`Updated book ${book.id} with slug: ${slug}`);
    }
  }
}

updateSlugs();
