import { apiRequest, USE_MOCK_FALLBACK } from "@/lib/api/client";
import { getOrdersApi, updateOrderStatusApi } from "@/lib/api/orders";
import type { QrVerifyRequest, QrVerifyResponse } from "@/types/driver";

export async function verifyDriverQrApi(
  payload: QrVerifyRequest
): Promise<QrVerifyResponse> {
  try {
    return await apiRequest<QrVerifyResponse>("/driver/verify-qr", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const kitchenNorm = payload.kitchenQr.trim().toUpperCase().replace(/^#/, "");
    const receiptNorm = payload.receiptQr.trim().toUpperCase().replace(/^#/, "");

    // Demo golden match matching screenshot (Ibu Ratna Pratiwi / KTG-0248)
    if (
      (kitchenNorm === "ORD-000" || kitchenNorm === "KTG-0248" || kitchenNorm === "ORD-001") &&
      receiptNorm === "KTG-0248"
    ) {
      return {
        matched: true,
        orderId: "ORD-000",
        orderCode: "#ORD-000",
        receiptCode: "KTG-0248",
        recipientName: "Ibu Ratna Pratiwi",
        deliveryAddress:
          "Jl. Melati No. 18, RT 003/RW 005, Kel. Cilandak Barat, Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12430",
        route: "Selatan · Cilandak",
        status: "ready",
      };
    }

    const orders = await getOrdersApi();
    const matchedOrder = orders.find(
      (o) =>
        (o.id.toUpperCase() === kitchenNorm ||
          o.orderCode.replace(/^#/, "").toUpperCase() === kitchenNorm) &&
        o.receiptCode.toUpperCase() === receiptNorm
    );

    if (matchedOrder) {
      return {
        matched: true,
        orderId: matchedOrder.id,
        orderCode: matchedOrder.orderCode,
        receiptCode: matchedOrder.receiptCode,
        recipientName: matchedOrder.customerName,
        deliveryAddress: matchedOrder.deliveryAddress,
        route: matchedOrder.deliveryRoute,
        status: matchedOrder.status,
      };
    }

    return {
      matched: false,
      message:
        "Data QR tidak sesuai dengan rute pengiriman. Periksa kembali alamat atau paket sebelum melanjutkan.",
    };
  }
}

export async function markOrderDeliveredApi(orderId: string): Promise<void> {
  try {
    await apiRequest(`/driver/orders/${encodeURIComponent(orderId)}/deliver`, {
      method: "PATCH",
      body: JSON.stringify({ status: "delivered" }),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    await updateOrderStatusApi(orderId, "delivered");
  }
}
