"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { DriverVerificationState } from "@/types/driver";

interface DriverHeaderProps {
  step: DriverVerificationState;
}

const STEP_LABELS: Record<DriverVerificationState, string> = {
  scanning: "VERIFIKASI",
  mismatch: "PERIKSA ULANG",
  verified: "TERVERIFIKASI",
};

export function DriverHeader({ step }: DriverHeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between pt-5 pb-3">
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#18352B]">
          KATERING / KURIR
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-bold tracking-[0.14em] uppercase ${
            step === "mismatch" ? "text-[#641E2A]" : "text-[#18352B]"
          }`}
        >
          {STEP_LABELS[step]}
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded-md p-1.5 text-[#18352B]/70 hover:bg-[#18352B]/10 hover:text-[#18352B] cursor-pointer"
          title="Keluar akun kurir"
          aria-label="Keluar akun kurir"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}
