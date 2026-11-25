"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { QrScannerBox } from "@/components/driver/QrScannerBox";
import { Button } from "@/components/ui/Button";

interface DualQrScannerProps {
  kitchenQr: string;
  receiptQr: string;
  onKitchenQrChange: (val: string) => void;
  onReceiptQrChange: (val: string) => void;
  onVerify: () => void;
  isVerifying: boolean;
}

export function DualQrScanner({
  kitchenQr,
  receiptQr,
  onKitchenQrChange,
  onReceiptQrChange,
  onVerify,
  isVerifying,
}: DualQrScannerProps) {
  return (
    <div className="flex flex-1 flex-col justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#18352B] tracking-tight font-sans">
          Verifikasi Pengiriman
        </h1>
        <p className="mt-1 text-xs text-[#18352B]/75">
          Scan kedua QR sebelum menyerahkan paket.
        </p>

        <div className="mt-5 space-y-5">
          <QrScannerBox
            stepTitle="1. Scan QR Dapur (Pesanan)"
            placeholderText="Tempatkan QR pesanan di dalam bingkai"
            value={kitchenQr}
            onChange={onKitchenQrChange}
            demoSampleCode="ORD-000"
          />

          <QrScannerBox
            stepTitle="2. Scan QR Resi (Tujuan)"
            placeholderText="Tempatkan QR tujuan di dalam bingkai"
            value={receiptQr}
            onChange={onReceiptQrChange}
            demoSampleCode="KTG-0248"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#18352B]/80">
          <ShieldCheck className="h-3.5 w-3.5 text-[#18352B]" />
          Pastikan kedua QR terbaca dengan jelas.
        </p>

        <Button
          variant="burgundy"
          size="lg"
          fullWidth
          disabled={!kitchenQr.trim() || !receiptQr.trim() || isVerifying}
          onClick={onVerify}
        >
          {isVerifying ? "Memverifikasi..." : "Verifikasi Data"}
        </Button>

        {/* Quick QA helper for testing mismatch state */}
        <div className="flex justify-center gap-4 pt-1 text-[10px] text-[#18352B]/65">
          <button
            type="button"
            onClick={() => {
              onKitchenQrChange("ORD-000");
              onReceiptQrChange("KTG-0248");
            }}
            className="underline hover:text-[#18352B] cursor-pointer"
          >
            Isi QR Cocok
          </button>
          <button
            type="button"
            onClick={() => {
              onKitchenQrChange("ORD-001");
              onReceiptQrChange("KTG-9999");
            }}
            className="underline hover:text-[#641E2A] cursor-pointer"
          >
            Simulasi Salah Alamat
          </button>
        </div>
      </div>
    </div>
  );
}
