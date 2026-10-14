import { readFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { localCertificates } from '../src/data/certificates';
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the seed environment.');
const client = createClient(url, key, { auth: { persistSession: false } });
for (const certificate of localCertificates) {
 const row = { ...certificate };
 const path = row.file_url ? resolve('public', row.file_url.slice(1)) : process.env.HACKATHON_FILE;
 if (path) {
  const name = `${row.id}/${basename(path)}`;
  const { error } = await client.storage.from('certificates').upload(name, await readFile(path), { contentType: 'application/pdf', upsert: true });
  if (error) throw error;
  row.file_url = client.storage.from('certificates').getPublicUrl(name).data.publicUrl;
 } else console.warn('Hackathon document missing: upload the document in /admin.');
 const { error } = await client.from('certificates').upsert(row);
 if (error) throw error;
 console.log(`Seeded: ${row.title_es}`);
}
