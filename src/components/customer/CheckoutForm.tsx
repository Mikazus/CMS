"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrderApi } from "@/lib/api/orders";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatRupiah } from "@/lib/utils/format";

export function CheckoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalPortions, totalPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState(user?.fullName || "Aditya Pratama");
  const [phone, setPhone] = useState(user?.phone || "0812 3456 7890");
  const [address, setAddress] = useState(
    "Jl. Kemang Raya No. 18, Bangka, Mampang Prapatan, Jakarta Selatan 12730"
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setError("Mohon lengkapi nama lengkap, nomor telepon, dan alamat pengiriman.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const payloadItems =
        items.length > 0
          ? items.map((i) => ({
              menuId: i.menuId,
              menuName: i.name,
              quantity: i.quantity,
              unitPrice: i.price,
              allergenNote: i.allergenNote,
            }))
          : [
              {
                menuId: "menu-01",
                menuName: "Nasi Liwet Nusantara",
                quantity: 2,
                unitPrice: 25000,
              },
            ];

      const createdOrder = await createOrderApi({
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        deliveryAddress: address.trim(),
        items: payloadItems,
      });

      clearCart();
      router.push(`/order-success/${encodeURIComponent(createdOrder.id)}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal membuat pesanan. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-md bg-[#DDD2BC] px-6 py-8 sm:px-11 sm:py-10 shadow-sm border border-[#18352B]/10">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="tracking-[0.16em] uppercase text-[#18352B]/65 font-medium">
          DETAIL PENGIRIMAN
        </span>
        <span className="font-semibold text-[#18352B]">
          {totalPortions} porsi · {formatRupiah(totalPrice)}
        </span>
      </div>

      <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#18352B]">
        Form Pemesanan
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm text-[#18352B]/70">
        Lengkapi detail Anda agar setiap hidangan tiba dengan tepat.
      </p>

      <hr className="my-6 border-[#18352B]/15" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap"
            surface="tan"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Aditya Pratama"
            required
          />
          <Input
            label="Nomor Telepon"
            surface="tan"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0812 3456 7890"
            required
          />
        </div>

        <div>
          <label
            htmlFor="delivery-address"
            className="block text-xs font-semibold text-[#18352B] mb-1.5"
          >
            Alamat Pengiriman
          </label>
          <textarea
            id="delivery-address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Masukkan alamat lengkap pengiriman..."
            className="w-full rounded-md border border-[#18352B]/25 bg-[#D5C7AE]/60 px-3.5 py-2.5 text-sm text-[#18352B] placeholder:text-[#18352B]/45 outline-none focus:border-[#18352B]"
            required
          />
        </div>

        {items.some((i) => i.allergenNote.trim()) && (
          <div className="rounded-md border border-[#641E2A]/25 bg-[#F3E4E6]/70 px-3.5 py-2.5 text-xs text-[#641E2A]">
            <p className="font-semibold mb-1">Catatan Alergen Terlampir:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              {items
                .filter((i) => i.allergenNote.trim())
                .map((i) => (
                  <li key={i.menuId}>
                    <strong>{i.name}:</strong> {i.allergenNote}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-[#F3E4E6] border border-[#641E2A]/30 px-3.5 py-2.5 text-xs text-[#641E2A]">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="burgundy"
          size="lg"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memproses Pesanan..." : "Konfirmasi Pesanan"}
        </Button>

        <p className="text-center text-[11px] text-[#18352B]/65">
          Pastikan alamat dan nomor telepon Anda sudah benar.
        </p>
      </form>
    </div>
  );
}
