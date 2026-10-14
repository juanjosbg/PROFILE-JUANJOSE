create table public.certificates (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
 title_es text not null check(length(trim(title_es)) > 0), title_en text not null check(length(trim(title_en)) > 0),
 issuer text not null, category text not null check(category in ('hackathon','course','certification','award')),
 issued_at date, credential_id text, verify_url text, file_url text, thumbnail_url text,
 skills text[] not null default '{}', description_es text, description_en text,
 featured boolean not null default false, sort_order integer not null default 0,
 constraint safe_file check(file_url is null or file_url ~ '^https://' or file_url ~ '^/images/'),
 constraint safe_thumbnail check(thumbnail_url is null or thumbnail_url ~ '^https://'),
 constraint safe_verify check(verify_url is null or verify_url ~ '^https://')
);
create index certificates_date_idx on public.certificates(issued_at desc, sort_order);
alter table public.certificates enable row level security;
create policy "Public read" on public.certificates for select to anon, authenticated using(true);
create policy "Owner writes" on public.certificates for all to authenticated
 using ((select auth.jwt()->>'email') = 'juanjoseborrero95@gmail.com')
 with check ((select auth.jwt()->>'email') = 'juanjoseborrero95@gmail.com');
grant select on public.certificates to anon;
grant select, insert, update, delete on public.certificates to authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('certificates','certificates',true,20971520,array['application/pdf','image/png','image/jpeg']);
create policy "Certificate files public" on storage.objects for select to anon, authenticated using(bucket_id='certificates');
create policy "Owner manages certificate files" on storage.objects for all to authenticated
 using(bucket_id='certificates' and (select auth.jwt()->>'email')='juanjoseborrero95@gmail.com')
 with check(bucket_id='certificates' and (select auth.jwt()->>'email')='juanjoseborrero95@gmail.com');
