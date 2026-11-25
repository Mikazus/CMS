import { apiRequest, USE_MOCK_FALLBACK } from "@/lib/api/client";
import type { CreateMenuDTO, MenuItem, UpdateMenuDTO } from "@/types/menu";

const STORAGE_KEY = "layah_menus_v1";

export const INITIAL_MENUS: MenuItem[] = [
  {
    id: "menu-01",
    name: "Nasi Liwet Nusantara",
    description: "Nasi liwet · ayam suwir · sambal",
    category: "Paket Nasi",
    price: 25000,
    isAvailable: true,
    allergens: ["Bawang"],
  },
  {
    id: "menu-02",
    name: "Ayam Bakar Madu",
    description: "Nasi putih · ayam bakar · lalapan",
    category: "Lauk Pilihan",
    price: 22000,
    isAvailable: true,
    allergens: ["Madu"],
  },
  {
    id: "menu-03",
    name: "Babi Rica",
    description: "Babi rica · nasi · sambal tomat",
    category: "Lauk Pilihan",
    price: 35000,
    isAvailable: true,
  },
  {
    id: "menu-04",
    name: "Nasi Rendang Minang",
    description: "Rendang sapi · daun singkong",
    category: "Paket Nasi",
    price: 32000,
    isAvailable: true,
    allergens: ["Santan"],
  },
  {
    id: "menu-05",
    name: "Gado-Gado Betawi",
    description: "Sayuran segar · bumbu kacang",
    category: "Sayuran",
    price: 22000,
    isAvailable: true,
    allergens: ["Kacang"],
  },
  {
    id: "menu-06",
    name: "Ikan Bakar Jimbaran",
    description: "Ikan bakar · nasi · sambal matah",
    category: "Lauk Pilihan",
    price: 20000,
    isAvailable: true,
    allergens: ["Ikan"],
  },
];

function readLocalMenus(): MenuItem[] {
  if (typeof window === "undefined") return INITIAL_MENUS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENUS));
      return INITIAL_MENUS;
    }
    return JSON.parse(raw) as MenuItem[];
  } catch {
    return INITIAL_MENUS;
  }
}

function writeLocalMenus(menus: MenuItem[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  }
}

export async function getMenusApi(): Promise<MenuItem[]> {
  try {
    return await apiRequest<MenuItem[]>("/menus");
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    return readLocalMenus();
  }
}

export async function createMenuApi(payload: CreateMenuDTO): Promise<MenuItem> {
  try {
    return await apiRequest<MenuItem>("/menus", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const menus = readLocalMenus();
    const created: MenuItem = {
      ...payload,
      id: `menu-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    writeLocalMenus([created, ...menus]);
    return created;
  }
}

export async function updateMenuApi(
  id: string,
  payload: UpdateMenuDTO
): Promise<MenuItem> {
  try {
    return await apiRequest<MenuItem>(`/menus/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const menus = readLocalMenus();
    let updatedItem: MenuItem | undefined;
    const next = menus.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...payload };
        return updatedItem;
      }
      return item;
    });
    writeLocalMenus(next);
    if (!updatedItem) throw new Error("Menu tidak ditemukan");
    return updatedItem;
  }
}

export async function deleteMenuApi(id: string): Promise<void> {
  try {
    await apiRequest(`/menus/${id}`, { method: "DELETE" });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const menus = readLocalMenus().filter((item) => item.id !== id);
    writeLocalMenus(menus);
  }
}
