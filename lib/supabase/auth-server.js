import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createAuthServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Dipanggil dari Server Component: cookie hanya bisa diubah
            // lewat Server Action, Route Handler, atau proxy.
          }
        },
      },
    },
  );
}

// Dipakai di setiap halaman admin supaya proteksi tidak hanya bergantung
// pada proxy.js. Tanpa sesi yang valid, pengunjung langsung dialihkan.
export async function wajibLogin() {
  const supabase = await createAuthServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return user;
}
