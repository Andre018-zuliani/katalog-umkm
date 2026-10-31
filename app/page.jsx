import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let gagalMemuat = false;

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    daftarProduk = data ?? [];
  } catch {
    gagalMemuat = true;
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>
        {gagalMemuat ? (
          <p className="rounded-xl border border-garis bg-permukaan p-4 text-teks-lembut">
            Gagal memuat produk dari database. Silakan coba lagi.
          </p>
        ) : daftarProduk.length === 0 ? (
          <p className="rounded-xl border border-garis bg-permukaan p-4 text-teks-lembut">
            Belum ada produk
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
