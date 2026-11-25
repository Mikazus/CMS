"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, QrCode, X } from "lucide-react";

interface QrScannerBoxProps {
  stepTitle: string;
  placeholderText: string;
  value: string;
  onChange: (val: string) => void;
  demoSampleCode: string;
}

export function QrScannerBox({
  stepTitle,
  placeholderText,
  value,
  onChange,
  demoSampleCode,
}: QrScannerBoxProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!cameraActive) return;
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      })
      .catch(() => {
        setCameraError("Kamera tidak tersedia. Gunakan input QR atau simulasi scan.");
        setCameraActive(false);
      });

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [cameraActive]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-[#18352B]">{stepTitle}</p>
        {value && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#18352B]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Terbaca
          </span>
        )}
      </div>

      {/* Racing Green Viewfinder matching screenshot */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-[#18352B] p-4 flex flex-col items-center justify-center text-[#C9B99A]">
        {cameraActive && (
          <video
            ref={videoRef}
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
        )}

        {/* Corner Brackets */}
        <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-[#C9B99A]/80" />
        <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-[#C9B99A]/80" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#C9B99A]/80" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#C9B99A]/80" />

        {/* Scan Line */}
        <div className="pointer-events-none absolute inset-x-7 top-1/2 h-px bg-[#C9B99A]/45" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <QrCode className="h-6 w-6 text-[#C9B99A]/90 mb-2" />
          <p className="text-[11px] text-[#C9B99A]/90">{placeholderText}</p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCameraError(null);
                setCameraActive((prev) => !prev);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-[#C9B99A]/45 bg-[#11261F]/80 px-2.5 py-1 text-[10px] font-medium text-[#FBF9F4] hover:bg-[#11261F] cursor-pointer"
            >
              {cameraActive ? (
                <>
                  <X className="h-3 w-3" /> Tutup Kamera
                </>
              ) : (
                <>
                  <Camera className="h-3 w-3" /> Buka Kamera
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onChange(demoSampleCode)}
              className="rounded-md bg-[#C9B99A] px-2.5 py-1 text-[10px] font-semibold text-[#18352B] hover:bg-[#DDD2BC] cursor-pointer"
            >
              Simulasi Scan
            </button>
          </div>
        </div>
      </div>

      {/* Direct QR payload input for handheld scanners / quick QA */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Kode QR (contoh: ${demoSampleCode})`}
        className="w-full rounded-lg border border-[#18352B]/25 bg-[#DDD2BC]/75 px-3 py-2 text-xs font-medium text-[#18352B] placeholder:text-[#18352B]/45 outline-none focus:border-[#18352B]"
      />

      {cameraError && (
        <p className="text-[11px] text-[#641E2A]">{cameraError}</p>
      )}
    </div>
  );
}
