import { apiRequest, USE_MOCK_FALLBACK } from "@/lib/api/client";
import type { AuthResponse, LoginPayload, User, UserRole } from "@/types/auth";

const MOCK_USERS: Record<UserRole, User> = {
  customer: {
    id: "usr-cust-01",
    username: "aditya",
    fullName: "Aditya Pratama",
    email: "aditya.pratama@gmail.com",
    phone: "0812 3456 7890",
    role: "customer",
    initials: "AP",
    title: "Customer",
  },
  kitchen: {
    id: "usr-kitch-01",
    username: "ayu.pramesti",
    fullName: "Ayu Pramesti",
    email: "ayu.pramesti@layah.id",
    role: "kitchen",
    initials: "AP",
    title: "Kitchen Staff",
  },
  driver: {
    id: "usr-drv-01",
    username: "bagas.kurir",
    fullName: "Bagas Santoso",
    email: "bagas.kurir@layah.id",
    role: "driver",
    initials: "BS",
    title: "Kurir Lapangan",
  },
  management: {
    id: "usr-mgmt-01",
    username: "anindya.putri",
    fullName: "Anindya Putri",
    email: "anindya.putri@layah.id",
    role: "management",
    initials: "AP",
    title: "Administrator",
  },
};

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  try {
    return await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    const baseUser = MOCK_USERS[payload.role];
    const displayName =
      payload.username.trim().length > 0 && payload.role === "customer"
        ? payload.username.trim().charAt(0).toUpperCase() + payload.username.trim().slice(1)
        : baseUser.fullName;

    return {
      token: `mock-jwt-${payload.role}-${Date.now()}`,
      user: {
        ...baseUser,
        username: payload.username.trim() || baseUser.username,
        fullName: displayName,
      },
    };
  }
}

export async function logoutApi(): Promise<void> {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } catch {
    // Graceful client-side session clear when running offline/mock
  }
}

export function getDefaultUserForRole(role: UserRole): User {
  return MOCK_USERS[role];
}
