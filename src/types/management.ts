export interface SalesSummary {
  period: string;
  periodRangeLabel: string;
  totalOrders: number;
  ordersGrowthPct: number;
  prevOrders: number;
  totalRevenue: number;
  revenueGrowthPct: number;
  prevRevenue: number;
  activeCustomers: number;
  customersGrowthPct: number;
  prevCustomers: number;
  ytdTotalRevenue: number;
  highlightNote: string;
  lastUpdated: string;
}

export interface MonthlyRevenuePoint {
  month: string;
  revenueMillions: number;
  isCurrent?: boolean;
}

export interface SalesReportResponse {
  summary: SalesSummary;
  monthlyTrend: MonthlyRevenuePoint[];
}

export type MemberStatus = "Active" | "Inactive";

export interface MemberRecord {
  id: string;
  memberCode: string; // LRS-001
  fullName: string;
  email: string;
  status: MemberStatus;
  joinedDate: string; // 12 Jan 2025
  totalTransactions: number;
}

export interface MembershipResponse {
  totalRegistered: number;
  activeCount: number;
  inactiveCount: number;
  asOfLabel: string;
  members: MemberRecord[];
}
