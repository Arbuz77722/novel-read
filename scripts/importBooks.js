import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import Epub from 'epub';
import readline from 'readline';

const supabaseUrl = 'https://kgozoiahigeetbrpchzb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnb3pvaWFoaWdlZXRicnBjaHpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjgyMDA5NywiZXhwIjoyMDcyMzk2MDk3fQ.m0n5g2XYvF-kHpBiQm3unC7xBfdua7mJhR9JVOtuHQ4';
const supabase = createClient(supabaseUrl, supabaseKey);

const EPUBS_DIR = path.join(process.cwd(), 'epubs');

// 🧹 Cleanup
async function cleanup() {
  console.log('🧹 Wiping old rows...');

  await supabase.from('chapters').delete().neq('id', 0);
  await supabase.from('books').delete().neq('id', 0);

  console.log('✅ Database cleared');
}

// 👉 Ask user in console
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim().toLowerCase());
    })
  );
}

// 🧼 Clean HTML with cheerio
function cleanHtml(rawHtml) {
  const $ = cheerio.load(rawHtml);

  // Remove comments, scripts, styles
  $('script, style').remove();
  $('*')
    .contents()
    .each(function () {
      if (this.type === 'comment') $(this).remove();
    });

  // Trim whitespace
  const text = $('body').html() || '';
  return text.trim();
}

// 📚 Import single epub
async function importEpub(filePath) {
  return new Promise((resolve, reject) => {
    const epub = new Epub(filePath);

    epub.on('end', async () => {
      try {
        const metadata = epub.metadata || {};
        const title = metadata.title || path.basename(filePath, '.epub');
        const author = metadata.creator || 'Unknown';
        const description = metadata.description || 'No description available.';
        const status = metadata.status?.toLowerCase() || 'ongoing';

        // Insert book
        const { data: book, error: bookError } = await supabase
          .from('books')
          .insert([{ title, author, description, status }])
          .select()
          .single();

        if (bookError) throw bookError;

        // Insert chapters
        let chapterNum = 1;
        for (const chapter of epub.flow) {
          const content = await new Promise((res, rej) =>
            epub.getChapter(chapter.id, (err, text) => {
              if (err) rej(err);
              else res(text);
            })
          );

          const cleaned = cleanHtml(content);

          await supabase.from('chapters').insert([
            {
              book_id: book.id,
              title: chapter.title || `Chapter ${chapterNum}`,
              number: chapterNum,
              content: cleaned,
            },
          ]);

          chapterNum++;
        }

        console.log(`✅ Imported: ${title}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    epub.on('error', reject);
    epub.parse();
  });
}

// 📖 Import all books
async function importAllBooks() {
  const files = fs.readdirSync(EPUBS_DIR).filter((f) => f.endsWith('.epub'));

  for (const file of files) {
    const filePath = path.join(EPUBS_DIR, file);
    console.log(`📖 Processing: ${file}`);
    await importEpub(filePath);
  }

  console.log('🎉 All books imported!');
}

// 🚀 Main runner
async function main() {
  const answer = await askQuestion(
    'Do you want to wipe existing data before import? (y/n): '
  );

  if (answer === 'y' || answer === 'yes') {
    await cleanup();
  } else {
    console.log('⏩ Skipping cleanup, keeping existing data.');
  }

  await importAllBooks();
}

main().catch((err) => {
  console.error('❌ Import failed:', err);
});
