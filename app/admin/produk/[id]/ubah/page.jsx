import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { ubahProduk } from "@/app/admin/actions";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { wajibLogin } from "@/lib/supabase/auth-server";

// US-09 (bonus di jalur offline): ubah produk.
export default async function HalamanUbahProduk({ params }) {
  await wajibLogin();

  const { id } = await params;
  const supabase = createServerSupabaseClient();
  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormProduk
        produk={produk}
        labelTombol="Simpan perubahan"
        action={ubahProduk}
      />
    </div>
  );
}
