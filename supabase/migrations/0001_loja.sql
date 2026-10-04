-- Loja: produtos, administradores e bucket de imagens.
-- Leitura pública só de produtos publicados; escrita só para quem está em `admins`.

create extension if not exists pgcrypto;

/* -------------------------------------------------------------------------- */
/* Administradores                                                             */
/* -------------------------------------------------------------------------- */

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self" on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

/* -------------------------------------------------------------------------- */
/* Produtos                                                                    */
/* -------------------------------------------------------------------------- */

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  image text not null default '',
  images text[] not null default '{}',
  price numeric(10, 2) not null check (price >= 0),
  old_price numeric(10, 2) check (old_price is null or old_price >= 0),
  installment text,
  category text not null check (category in ('camisetas', 'acessorios', 'kits')),
  rating numeric(2, 1) not null default 5 check (rating between 0 and 5),
  reviews integer not null default 0 check (reviews >= 0),
  badge text check (badge in ('mais-vendido', 'novo', 'oferta')),
  available boolean not null default true,
  published boolean not null default true,
  description text,
  options jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_position_idx on public.products (position, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "products_select" on public.products;
create policy "products_select" on public.products
  for select to anon, authenticated
  using (published or (select public.is_admin()));

drop policy if exists "products_insert_admin" on public.products;
create policy "products_insert_admin" on public.products
  for insert to authenticated
  with check ((select public.is_admin()));

drop policy if exists "products_update_admin" on public.products;
create policy "products_update_admin" on public.products
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "products_delete_admin" on public.products;
create policy "products_delete_admin" on public.products
  for delete to authenticated
  using ((select public.is_admin()));

/* -------------------------------------------------------------------------- */
/* Storage: imagens dos produtos                                               */
/* -------------------------------------------------------------------------- */

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'produtos',
  'produtos',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "produtos_insert_admin" on storage.objects;
create policy "produtos_insert_admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'produtos' and (select public.is_admin()));

drop policy if exists "produtos_update_admin" on storage.objects;
create policy "produtos_update_admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'produtos' and (select public.is_admin()));

drop policy if exists "produtos_delete_admin" on storage.objects;
create policy "produtos_delete_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'produtos' and (select public.is_admin()));

/* -------------------------------------------------------------------------- */
/* Seed: produtos que estavam no mock                                          */
/* -------------------------------------------------------------------------- */

insert into public.products
  (name, slug, image, price, old_price, category, rating, reviews, badge, available, options, description, position)
values
  ('Camiseta Rap in Concert', 'camiseta-rap-in-concert', '/loja/branca-selecao.png', 89.90, 119.90, 'camisetas', 4.9, 128, 'mais-vendido', true,
   '[{"name":"Tamanho","values":["P","M","G","GG"]}]',
   'Camiseta oficial do espetáculo, em algodão penteado 30.1 com gramatura pesada. Estampa em silk de alta durabilidade com o logo do Rap in Concert. Modelagem unissex.', 1),
  ('Camiseta O Rap Vive!', 'camiseta-o-rap-vive', '/loja/branca-selecao.png', 89.90, null, 'camisetas', 4.8, 64, 'novo', true,
   '[{"name":"Tamanho","values":["P","M","G","GG"]}]',
   'O manifesto do projeto estampado no peito. Algodão penteado, corte reto e estampa frontal em branco sobre preto.', 2),
  ('Camiseta Nada Pode Nos Parar', 'camiseta-nada-pode-nos-parar', '/loja/branca-selecao.png', 89.90, 109.90, 'camisetas', 5.0, 41, 'oferta', true,
   '[{"name":"Tamanho","values":["P","M","G","GG"]}]',
   'Camiseta da 3ª edição, com a frase que batizou o espetáculo estampada nas costas. Algodão penteado 30.1 e modelagem unissex.', 3),
  ('Camiseta 4 Elementos', 'camiseta-4-elementos', '/loja/branca-selecao.png', 89.90, null, 'camisetas', 4.8, 37, null, true,
   '[{"name":"Tamanho","values":["P","M","G","GG"]}]',
   'Homenagem aos quatro elementos do hip hop — MC, DJ, breaking e grafite — em estampa frontal. Algodão penteado, corte reto.', 4)
on conflict (slug) do nothing;
