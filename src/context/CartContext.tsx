"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MenuItem } from "@/types/menu";
import type { CartItem } from "@/types/order";

interface CartContextValue {
  items: CartItem[];
  totalPortions: number;
  totalPrice: number;
  addToCart: (menu: MenuItem) => void;
  removeFromCart: (menuId: string) => void;
  updateQuantity: (menuId: string, delta: number) => void;
  updateAllergenNote: (menuId: string, note: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "layah_cart_v1";

const DEFAULT_DEMO_CART: CartItem[] = [
  {
    menuId: "menu-01",
    name: "Nasi Liwet Nusantara",
    price: 25000,
    quantity: 2,
    allergenNote: "",
    category: "Paket Nasi",
  },
  {
    menuId: "menu-02",
    name: "Ayam Bakar Madu",
    price: 22000,
    quantity: 1,
    allergenNote: "",
    category: "Lauk Pilihan",
  },
  {
    menuId: "menu-03",
    name: "Babi Rica",
    price: 35000,
    quantity: 1,
    allergenNote: "",
    category: "Lauk Pilihan",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved) as CartItem[]);
      } else {
        setItems(DEFAULT_DEMO_CART);
      }
    } catch {
      setItems(DEFAULT_DEMO_CART);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addToCart = (menu: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuId === menu.id);
      if (existing) {
        return prev.map((i) =>
          i.menuId === menu.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          menuId: menu.id,
          name: menu.name,
          price: menu.price,
          quantity: 1,
          allergenNote: "",
          category: menu.category,
        },
      ];
    });
  };

  const removeFromCart = (menuId: string) => {
    setItems((prev) => prev.filter((i) => i.menuId !== menuId));
  };

  const updateQuantity = (menuId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.menuId === menuId ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const updateAllergenNote = (menuId: string, note: string) => {
    setItems((prev) =>
      prev.map((i) => (i.menuId === menuId ? { ...i, allergenNote: note } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPortions = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalPortions,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateAllergenNote,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
