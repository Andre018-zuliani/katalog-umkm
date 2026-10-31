"use server";

import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/auth-server";

export async function loginAdmin(previousState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau password salah. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createAuthServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function ubahPasswordAdmin(previousState, formData) {
  const passwordBaru = formData.get("password_baru")?.toString();
  const konfirmasiPassword = formData.get("konfirmasi_password")?.toString();

  if (!passwordBaru || passwordBaru.length < 8) {
    return { error: "Password baru harus minimal 8 karakter.", success: null };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama.", success: null };
  }

  const supabase = await createAuthServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Sesi login tidak valid. Silakan login kembali.",
      success: null,
    };
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    return {
      error: "Gagal mengganti password. Silakan coba lagi.",
      success: null,
    };
  }

  return { error: null, success: "Password berhasil diubah." };
}

export async function tambahProduk(formData) {
  const nama = formData.get("nama")?.toString().trim();
  const harga = Number(formData.get("harga"));

  if (!nama || !Number.isInteger(harga) || harga < 0) {
    throw new Error("Nama dan harga produk tidak valid.");
  }

  const supabase = await createAuthServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori: formData.get("kategori")?.toString().trim() || null,
    foto_url: formData.get("foto_url")?.toString().trim() || null,
    deskripsi: formData.get("deskripsi")?.toString().trim() || null,
  });

  if (error) {
    throw new Error("Gagal menyimpan produk.");
  }

  redirect("/admin");
}

export async function ubahProduk(formData) {
  const id = formData.get("id")?.toString();
  const nama = formData.get("nama")?.toString().trim();
  const harga = Number(formData.get("harga"));

  if (!id || !nama || !Number.isInteger(harga) || harga < 0) {
    throw new Error("Data produk tidak valid.");
  }

  const supabase = await createAuthServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori: formData.get("kategori")?.toString().trim() || null,
      foto_url: formData.get("foto_url")?.toString().trim() || null,
      deskripsi: formData.get("deskripsi")?.toString().trim() || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error("Gagal menyimpan perubahan produk.");
  }

  redirect("/admin");
}
