import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/app/admin/actions";
import { wajibLogin } from "@/lib/supabase/auth-server";

export default async function HalamanTambahProduk() {
  await wajibLogin();

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Tambah produk</h1>
      <FormProduk labelTombol="Simpan produk" action={tambahProduk} />
    </div>
  );
}
