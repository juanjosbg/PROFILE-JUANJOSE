import { readFile } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import { existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { localCertificates } from "../src/data/certificates";
import { eagBuildathon, isEagCertificate } from "../src/data/eag-buildathon";
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key)
  throw new Error(
    "Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the seed environment.",
  );
const client = createClient(url, key, { auth: { persistSession: false } });
const { data: existing, error: readError } = await client
  .from("certificates")
  .select("id");
if (readError) throw readError;
const existingIds = new Set(existing.map((row) => row.id));
for (const certificate of localCertificates) {
  if (existingIds.has(certificate.id)) {
    console.log(`Already seeded: ${certificate.title_es}`);
    continue;
  }
  const row = { ...certificate };
  const localEagImage = resolve("public", eagBuildathon.imageUrl.slice(1));
  const path = row.file_url
    ? resolve("public", row.file_url.slice(1))
    : (process.env.HACKATHON_FILE ??
      (isEagCertificate(row) && existsSync(localEagImage)
        ? localEagImage
        : undefined));
  if (path) {
    const name = `${row.id}/${basename(path)}`;
    const { error } = await client.storage
      .from("certificates")
      .upload(name, await readFile(path), {
        contentType:
          extname(path).toLowerCase() === ".png"
            ? "image/png"
            : /\.jpe?g$/i.test(path)
              ? "image/jpeg"
              : "application/pdf",
        upsert: true,
      });
    if (error) throw error;
    row.file_url = client.storage
      .from("certificates")
      .getPublicUrl(name).data.publicUrl;
    if (/\.(png|jpe?g)$/i.test(path)) row.thumbnail_url = row.file_url;
  } else
    console.warn("Hackathon document missing: upload the document in /admin.");
  const { error } = await client.from("certificates").insert(row);
  if (error) throw error;
  console.log(`Seeded: ${row.title_es}`);
}
