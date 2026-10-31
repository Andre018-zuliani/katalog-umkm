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
