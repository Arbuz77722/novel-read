import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Supabase client
const supabaseUrl = 'https://kgozoiahigeetbrpchzb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnb3pvaWFoaWdlZXRicnBjaHpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjgyMDA5NywiZXhwIjoyMDcyMzk2MDk3fQ.m0n5g2XYvF-kHpBiQm3unC7xBfdua7mJhR9JVOtuHQ4';
const supabase = createClient(supabaseUrl, supabaseKey);

// Folder where your images are stored
const coversFolder = path.join(process.cwd(), 'books-covers'); // root/books-covers
const extensions = ['png', 'jpg', 'jpeg']; // allowed formats

async function uploadCovers() {
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select('id, slug');

    if (error) throw error;

    for (const book of books) {
      if (!book.slug) {
        console.log(`Skipping book id ${book.id} because slug is missing`);
        continue;
      }

      let localFilePath = null;
      let ext = null;

      // Find the file with any allowed extension (case-insensitive)
      for (const e of extensions) {
        const filePath = path.join(coversFolder, `${book.slug}.${e}`);
        const filePathUpper = path.join(
          coversFolder,
          `${book.slug}.${e.toUpperCase()}`
        );
        if (fs.existsSync(filePath)) {
          localFilePath = filePath;
          ext = e;
          break;
        } else if (fs.existsSync(filePathUpper)) {
          localFilePath = filePathUpper;
          ext = e;
          break;
        }
      }

      if (!localFilePath) {
        console.log(`File not found for slug: ${book.slug} (.png/.jpg/.jpeg)`);
        continue;
      }

      const fileName = `${book.slug}.${ext}`;

      // Upload to Supabase bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('books-covers')
        .upload(fileName, fs.createReadStream(localFilePath), {
          upsert: true,
          duplex: 'half',
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, // jpg → jpeg
        });

      // Get public URL
      const { data: publicData, error: publicError } = supabase.storage
        .from('books-covers')
        .getPublicUrl(fileName);

      if (publicError) {
        console.log(
          `Failed to get public URL for ${fileName}:`,
          publicError.message
        );
        continue;
      }

      const publicUrl = publicData.publicUrl;

      // Update book record
      const { error: updateError } = await supabase
        .from('books')
        .update({ cover_url: publicUrl })
        .eq('id', book.id);

      if (updateError) {
        console.log(
          `Failed to update cover_url for book id ${book.id}:`,
          updateError.message
        );
      } else {
        console.log(`Updated book id ${book.id} with cover_url: ${publicUrl}`);
      }
    }

    console.log('✅ All done!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

uploadCovers();
