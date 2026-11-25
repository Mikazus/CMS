"use client";

import { useCallback, useEffect, useState } from "react";
import { getOrdersApi, updateOrderStatusApi } from "@/lib/api/orders";
import type { Order, OrderStatus } from "@/types/order";

export function useKdsOrders(pollIntervalMs: number = 15000) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>("10:42");

  const fetchOrders = useCallback(async () => {
    try {
      const data = await getOrdersApi();
      setOrders(data);
      const now = new Date();
      setLastSynced(
        `${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchOrders, pollIntervalMs]);

  const advanceStatus = useCallback(
    async (orderId: string, nextStatus: OrderStatus) => {
      const updated = await updateOrderStatusApi(orderId, nextStatus);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updated : order))
      );
      return updated;
    },
    []
  );

  return {
    orders,
    isLoading,
    lastSynced,
    refresh: fetchOrders,
    advanceStatus,
  };
}
