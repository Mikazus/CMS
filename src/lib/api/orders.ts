import { apiRequest, USE_MOCK_FALLBACK } from "@/lib/api/client";
import type { CreateOrderPayload, Order, OrderStatus } from "@/types/order";

const STORAGE_KEY = "layah_orders_v1";

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    orderCode: "#ORD-001",
    receiptCode: "KTG-0248",
    customerName: "Nadia Omara",
    customerPhone: "+62 812 3456 7890",
    deliveryAddress: "Jl. Kemang Raya No. 18, Jakarta Selatan",
    deliveryRoute: "Selatan · Kemang",
    scheduledTime: "11:30",
    scheduledLabel: "Today, 11:30 WIB",
    serviceType: "Lunch service · Home delivery",
    status: "incoming",
    allergyAlert: "Peanut allergy",
    allergyInstruction:
      "WARNING: Peanut Allergy - No peanuts in Gado-Gado. Use clean utensils and a separate preparation area. Avoid cross-contact.",
    totalAmount: 92000,
    createdAt: "2026-11-01T10:38:00+07:00",
    elapsedMinutes: 4,
    items: [
      {
        id: "oi-1",
        menuId: "menu-01",
        menuName: "Nasi Liwet Nusantara",
        description: "Fragrant rice, traditional accompaniments",
        category: "Main",
        quantity: 2,
        unitPrice: 25000,
      },
      {
        id: "oi-2",
        menuId: "menu-05",
        menuName: "Gado-Gado",
        description: "Vegetable salad · No peanuts",
        category: "Side",
        quantity: 1,
        unitPrice: 22000,
        allergenNote: "No peanuts",
      },
      {
        id: "oi-3",
        menuId: "menu-07",
        menuName: "Es Teh Manis",
        description: "Sweet iced tea",
        category: "Beverage",
        quantity: 2,
        unitPrice: 10000,
      },
    ],
  },
  {
    id: "ORD-002",
    orderCode: "#ORD-002",
    receiptCode: "KTG-0249",
    customerName: "Lilbah",
    customerPhone: "+62 813 9981 1102",
    deliveryAddress: "Jl. Teuku Umar No. 12, Menteng, Jakarta Pusat",
    deliveryRoute: "Pusat · Menteng",
    scheduledTime: "11:45",
    scheduledLabel: "Today, 11:45 WIB",
    serviceType: "Lunch service · Office delivery",
    status: "incoming",
    totalAmount: 120000,
    createdAt: "2026-11-01T10:34:00+07:00",
    elapsedMinutes: 8,
    items: [
      {
        id: "oi-4",
        menuId: "menu-02",
        menuName: "Ayam Bakar Madu",
        description: "Honey glazed grilled chicken",
        category: "Main",
        quantity: 4,
        unitPrice: 22000,
      },
      {
        id: "oi-5",
        menuId: "menu-08",
        menuName: "Nasi Putih",
        description: "Steamed fragrant white rice",
        category: "Side",
        quantity: 4,
        unitPrice: 8000,
      },
    ],
  },
  {
    id: "ORD-003",
    orderCode: "#ORD-003",
    receiptCode: "KTG-0250",
    customerName: "Putri Padang",
    customerPhone: "+62 811 2245 8890",
    deliveryAddress: "Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan",
    deliveryRoute: "Selatan · Senopati",
    scheduledTime: "11:15",
    scheduledLabel: "Today, 11:15 WIB",
    serviceType: "Lunch service · Home delivery",
    status: "preparing",
    totalAmount: 105000,
    createdAt: "2026-11-01T10:26:00+07:00",
    elapsedMinutes: 16,
    items: [
      {
        id: "oi-6",
        menuId: "menu-01",
        menuName: "Nasi Liwet Nusantara",
        category: "Main",
        quantity: 3,
        unitPrice: 25000,
      },
      {
        id: "oi-7",
        menuId: "menu-07",
        menuName: "Es Teh Manis",
        category: "Beverage",
        quantity: 3,
        unitPrice: 10000,
      },
    ],
  },
  {
    id: "ORD-004",
    orderCode: "#ORD-004",
    receiptCode: "KTG-0251",
    customerName: "Bianto",
    customerPhone: "+62 815 7710 3421",
    deliveryAddress: "Jl. Cikini Raya No. 72, Menteng, Jakarta Pusat",
    deliveryRoute: "Pusat · Cikini",
    scheduledTime: "11:30",
    scheduledLabel: "Today, 11:30 WIB",
    serviceType: "Lunch service · Office delivery",
    status: "preparing",
    allergyAlert: "Shellfish allergy",
    allergyInstruction:
      "WARNING: Shellfish Allergy - Ensure zero shrimp paste (terasi) in sambal and clean prep station.",
    totalAmount: 200000,
    createdAt: "2026-11-01T10:20:00+07:00",
    elapsedMinutes: 22,
    items: [
      {
        id: "oi-8",
        menuId: "menu-04",
        menuName: "Rendang Minang",
        category: "Main",
        quantity: 5,
        unitPrice: 32000,
        allergenNote: "No terasi / shellfish",
      },
      {
        id: "oi-9",
        menuId: "menu-08",
        menuName: "Nasi Putih",
        category: "Side",
        quantity: 5,
        unitPrice: 8000,
      },
    ],
  },
  {
    id: "ORD-005",
    orderCode: "#ORD-005",
    receiptCode: "KTG-0252",
    customerName: "Justin Bieber",
    customerPhone: "+62 812 8899 0011",
    deliveryAddress: "Jl. Cipete Raya No. 9, Jakarta Selatan",
    deliveryRoute: "Selatan · Cipete",
    scheduledTime: "11:00",
    scheduledLabel: "Today, 11:00 WIB",
    serviceType: "Lunch service · Home delivery",
    status: "ready",
    totalAmount: 165000,
    createdAt: "2026-11-01T10:14:00+07:00",
    elapsedMinutes: 28,
    items: [
      {
        id: "oi-10",
        menuId: "menu-01",
        menuName: "Nasi Kuning Komplit",
        category: "Main",
        quantity: 3,
        unitPrice: 30000,
      },
      {
        id: "oi-11",
        menuId: "menu-02",
        menuName: "Sate Ayam",
        category: "Side",
        quantity: 3,
        unitPrice: 25000,
      },
    ],
  },
  {
    id: "ORD-006",
    orderCode: "#ORD-006",
    receiptCode: "KTG-0253",
    customerName: "Taylor Swift",
    customerPhone: "+62 818 6612 9087",
    deliveryAddress: "Jl. Medan Merdeka Selatan No. 5, Gambir, Jakarta Pusat",
    deliveryRoute: "Pusat · Gambir",
    scheduledTime: "11:00",
    scheduledLabel: "Today, 11:00 WIB",
    serviceType: "Lunch service · Office delivery",
    status: "ready",
    totalAmount: 72000,
    createdAt: "2026-11-01T10:10:00+07:00",
    elapsedMinutes: 32,
    items: [
      {
        id: "oi-12",
        menuId: "menu-01",
        menuName: "Nasi Liwet Nusantara",
        category: "Main",
        quantity: 2,
        unitPrice: 25000,
      },
      {
        id: "oi-13",
        menuId: "menu-05",
        menuName: "Gado-Gado",
        category: "Side",
        quantity: 1,
        unitPrice: 22000,
      },
    ],
  },
  {
    id: "ORD-000",
    orderCode: "#ORD-000",
    receiptCode: "KTG-0248",
    customerName: "Ibu Ratna Pratiwi",
    customerPhone: "+62 812 1990 4412",
    deliveryAddress:
      "Jl. Melati No. 18, RT 003/RW 005, Kel. Cilandak Barat, Kec. Cilandak, Jakarta Selatan, DKI Jakarta 12430",
    deliveryRoute: "Selatan · Cilandak",
    scheduledTime: "10:15",
    scheduledLabel: "Today, 10:15 WIB",
    serviceType: "Morning catering · Home delivery",
    status: "dispatched",
    totalAmount: 245000,
    createdAt: "2026-11-01T08:45:00+07:00",
    elapsedMinutes: 95,
    dispatchedAt: "Today, 09:50 WIB",
    items: [
      {
        id: "oi-14",
        menuId: "menu-01",
        menuName: "Nasi Liwet Nusantara",
        category: "Main",
        quantity: 5,
        unitPrice: 25000,
      },
      {
        id: "oi-15",
        menuId: "menu-04",
        menuName: "Nasi Rendang Minang",
        category: "Main",
        quantity: 3,
        unitPrice: 32000,
      },
      {
        id: "oi-16",
        menuId: "menu-06",
        menuName: "Ikan Bakar Jimbaran",
        category: "Main",
        quantity: 1,
        unitPrice: 24000,
      },
    ],
  },
  {
    id: "ORD-998",
    orderCode: "#ORD-998",
    receiptCode: "KTG-0245",
    customerName: "Dewi Anggraini",
    customerPhone: "+62 811 8877 6655",
    deliveryAddress: "Jl. Ijen Nirwana Blok B-4, Malang",
    deliveryRoute: "Malang · Tidar Atas",
    scheduledTime: "09:30",
    scheduledLabel: "Today, 09:30 WIB",
    serviceType: "Breakfast box · Office delivery",
    status: "delivered",
    totalAmount: 440000,
    createdAt: "2026-11-01T07:30:00+07:00",
    elapsedMinutes: 160,
    dispatchedAt: "Today, 09:05 WIB",
    deliveredAt: "Today, 09:28 WIB",
    items: [
      {
        id: "oi-17",
        menuId: "menu-02",
        menuName: "Ayam Bakar Madu",
        category: "Main",
        quantity: 20,
        unitPrice: 22000,
      },
    ],
  },
];

function readLocalOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw) as Order[];
  } catch {
    return INITIAL_ORDERS;
  }
}

function writeLocalOrders(orders: Order[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }
}

export async function getOrdersApi(): Promise<Order[]> {
  try {
    return await apiRequest<Order[]>("/orders");
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    return readLocalOrders();
  }
}

export async function getOrderByIdApi(id: string): Promise<Order | null> {
  try {
    return await apiRequest<Order>(`/orders/${encodeURIComponent(id)}`);
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const cleanId = id.replace(/^#/, "");
    return (
      readLocalOrders().find(
        (o) =>
          o.id.toLowerCase() === cleanId.toLowerCase() ||
          o.orderCode.replace(/^#/, "").toLowerCase() === cleanId.toLowerCase()
      ) ?? null
    );
  }
}

export async function createOrderApi(
  payload: CreateOrderPayload
): Promise<Order> {
  try {
    return await apiRequest<Order>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const existing = readLocalOrders();
    const numericSuffix = Math.floor(9000 + Math.random() * 900);
    const id = `ORD-${numericSuffix}`;
    const allergenNotes = payload.items
      .map((i) => i.allergenNote?.trim())
      .filter(Boolean) as string[];

    const newOrder: Order = {
      id,
      orderCode: `#${id}`,
      receiptCode: `KTG-${Math.floor(1000 + Math.random() * 8999)}`,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      deliveryAddress: payload.deliveryAddress,
      deliveryRoute: payload.deliveryAddress.toLowerCase().includes("malang")
        ? "Malang · Tidar Atas"
        : "Selatan · Kemang",
      scheduledTime: "12:00",
      scheduledLabel: "Today, 12:00 WIB",
      serviceType: "Lunch service · Home delivery",
      status: "incoming",
      allergyAlert: allergenNotes.length > 0 ? allergenNotes[0] : undefined,
      allergyInstruction:
        allergenNotes.length > 0
          ? `WARNING: Dietary request — ${allergenNotes.join("; ")}. Use clean utensils and avoid cross-contact.`
          : undefined,
      totalAmount: payload.items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      ),
      createdAt: new Date().toISOString(),
      elapsedMinutes: 1,
      items: payload.items.map((item, idx) => ({
        id: `oi-${Date.now()}-${idx}`,
        menuId: item.menuId,
        menuName: item.menuName,
        category: "Main",
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        allergenNote: item.allergenNote,
      })),
    };

    writeLocalOrders([newOrder, ...existing]);
    return newOrder;
  }
}

export async function updateOrderStatusApi(
  id: string,
  status: OrderStatus
): Promise<Order> {
  try {
    return await apiRequest<Order>(`/orders/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const orders = readLocalOrders();
    let updated: Order | undefined;
    const nowLabel = `Today, ${new Date()
      .toTimeString()
      .slice(0, 5)} WIB`;
    const next = orders.map((order) => {
      if (order.id === id) {
        updated = {
          ...order,
          status,
          dispatchedAt:
            status === "dispatched" ? nowLabel : order.dispatchedAt,
          deliveredAt: status === "delivered" ? nowLabel : order.deliveredAt,
        };
        return updated;
      }
      return order;
    });
    writeLocalOrders(next);
    if (!updated) throw new Error("Pesanan tidak ditemukan");
    return updated;
  }
}
