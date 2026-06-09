import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

// Cliente de servidor — solo para Server Components, Route Handlers y Server Actions
// Usa la secret key: tiene privilegios de admin y bypasea Row Level Security
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);
