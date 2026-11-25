"use client";

import React from "react";
import { useQrScanner } from "@/hooks/useQrScanner";
import { DriverHeader } from "@/components/driver/DriverHeader";
import { DualQrScanner } from "@/components/driver/DualQrScanner";
import { MismatchWarningView } from "@/components/driver/MismatchWarningView";
import { VerifiedDeliveryView } from "@/components/driver/VerifiedDeliveryView";

export default function DriverPage() {
  const {
    kitchenQr,
    setKitchenQr,
    receiptQr,
    setReceiptQr,
    step,
    isVerifying,
    isUpdating,
    statusUpdated,
    verificationResult,
    verify,
    confirmDelivered,
    reset,
  } = useQrScanner();

  return (
    <div className="flex flex-1 flex-col">
      <DriverHeader step={step} />

      {step === "scanning" && (
        <DualQrScanner
          kitchenQr={kitchenQr}
          receiptQr={receiptQr}
          onKitchenQrChange={setKitchenQr}
          onReceiptQrChange={setReceiptQr}
          onVerify={verify}
          isVerifying={isVerifying}
        />
      )}

      {step === "mismatch" && (
        <MismatchWarningView
          message={verificationResult?.message}
          onRescan={reset}
        />
      )}

      {step === "verified" && verificationResult && (
        <VerifiedDeliveryView
          data={verificationResult}
          statusUpdated={statusUpdated}
          isUpdating={isUpdating}
          onConfirmDelivered={confirmDelivered}
          onScanNext={reset}
        />
      )}
    </div>
  );
}
