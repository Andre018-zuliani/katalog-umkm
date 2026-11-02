"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { ubahPasswordAdmin } from "@/app/admin/actions";

export default function FormGantiPassword() {
  const [state, formAction, pending] = useActionState(ubahPasswordAdmin, {
    error: null,
    success: null,
  });

  return (
    <form action={formAction} className="flex max-w-sm flex-col gap-4">
      <Input
        label="Password baru"
        name="password_baru"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <Input
        label="Ulangi password baru"
        name="konfirmasi_password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      {state.error ? (
        <p className="text-sm text-bahaya" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-teks-lembut" role="status">
          {state.success}
        </p>
      ) : null}
      <Tombol type="submit" className="self-start" disabled={pending}>
        Simpan password
      </Tombol>
    </form>
  );
}
