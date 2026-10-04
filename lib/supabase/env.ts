export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!

/** Bucket público onde ficam as imagens dos produtos. */
export const PRODUCT_IMAGES_BUCKET = "produtos"
