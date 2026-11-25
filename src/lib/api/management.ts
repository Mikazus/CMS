import { apiRequest, USE_MOCK_FALLBACK } from "@/lib/api/client";
import type {
  MemberRecord,
  MembershipResponse,
  SalesReportResponse,
} from "@/types/management";

const SALES_BY_PERIOD: Record<string, SalesReportResponse> = {
  "Oktober 2026": {
    summary: {
      period: "Oktober 2026",
      periodRangeLabel: "01–31 Oktober 2026 · Seluruh pesanan selesai",
      totalOrders: 128,
      ordersGrowthPct: 12.3,
      prevOrders: 114,
      totalRevenue: 96000000,
      revenueGrowthPct: 14.3,
      prevRevenue: 84000000,
      activeCustomers: 84,
      customersGrowthPct: 10.5,
      prevCustomers: 76,
      ytdTotalRevenue: 680000000,
      highlightNote: "Oktober tertinggi tahun ini, naik 14,3% dari September.",
      lastUpdated: "31 Okt 2026, 18.00 WIB",
    },
    monthlyTrend: [
      { month: "Jan", revenueMillions: 48 },
      { month: "Feb", revenueMillions: 56 },
      { month: "Mar", revenueMillions: 52 },
      { month: "Apr", revenueMillions: 64 },
      { month: "Mei", revenueMillions: 60 },
      { month: "Jun", revenueMillions: 72 },
      { month: "Jul", revenueMillions: 68 },
      { month: "Agu", revenueMillions: 80 },
      { month: "Sep", revenueMillions: 84 },
      { month: "Okt", revenueMillions: 96, isCurrent: true },
    ],
  },
  "September 2026": {
    summary: {
      period: "September 2026",
      periodRangeLabel: "01–30 September 2026 · Seluruh pesanan selesai",
      totalOrders: 114,
      ordersGrowthPct: 5.6,
      prevOrders: 108,
      totalRevenue: 84000000,
      revenueGrowthPct: 5.0,
      prevRevenue: 80000000,
      activeCustomers: 76,
      customersGrowthPct: 7.0,
      prevCustomers: 71,
      ytdTotalRevenue: 584000000,
      highlightNote: "September stabil meningkat 5,0% dibanding Agustus.",
      lastUpdated: "30 Sep 2026, 18.00 WIB",
    },
    monthlyTrend: [
      { month: "Jan", revenueMillions: 48 },
      { month: "Feb", revenueMillions: 56 },
      { month: "Mar", revenueMillions: 52 },
      { month: "Apr", revenueMillions: 64 },
      { month: "Mei", revenueMillions: 60 },
      { month: "Jun", revenueMillions: 72 },
      { month: "Jul", revenueMillions: 68 },
      { month: "Agu", revenueMillions: 80 },
      { month: "Sep", revenueMillions: 84, isCurrent: true },
      { month: "Okt", revenueMillions: 96 },
    ],
  },
  "Agustus 2026": {
    summary: {
      period: "Agustus 2026",
      periodRangeLabel: "01–31 Agustus 2026 · Seluruh pesanan selesai",
      totalOrders: 108,
      ordersGrowthPct: 16.1,
      prevOrders: 93,
      totalRevenue: 80000000,
      revenueGrowthPct: 17.6,
      prevRevenue: 68000000,
      activeCustomers: 71,
      customersGrowthPct: 12.7,
      prevCustomers: 63,
      ytdTotalRevenue: 500000000,
      highlightNote: "Lonjakan pesanan acara kemerdekaan mendorong pertumbuhan Agustus.",
      lastUpdated: "31 Agu 2026, 18.00 WIB",
    },
    monthlyTrend: [
      { month: "Jan", revenueMillions: 48 },
      { month: "Feb", revenueMillions: 56 },
      { month: "Mar", revenueMillions: 52 },
      { month: "Apr", revenueMillions: 64 },
      { month: "Mei", revenueMillions: 60 },
      { month: "Jun", revenueMillions: 72 },
      { month: "Jul", revenueMillions: 68 },
      { month: "Agu", revenueMillions: 80, isCurrent: true },
      { month: "Sep", revenueMillions: 84 },
      { month: "Okt", revenueMillions: 96 },
    ],
  },
};

const BASE_MEMBERS: MemberRecord[] = [
  { id: "m-1", memberCode: "LRS-001", fullName: "Dewi Anggraini", email: "dewi.anggraini@gmail.com", status: "Active", joinedDate: "12 Jan 2025", totalTransactions: 24750000 },
  { id: "m-2", memberCode: "LRS-002", fullName: "Budi Santoso", email: "budi.santoso@gmail.com", status: "Active", joinedDate: "18 Jan 2025", totalTransactions: 18500000 },
  { id: "m-3", memberCode: "LRS-003", fullName: "Siti Rahmawati", email: "siti.rahmawati@gmail.com", status: "Active", joinedDate: "03 Feb 2025", totalTransactions: 32250000 },
  { id: "m-4", memberCode: "LRS-004", fullName: "Andi Pratama", email: "andi.pratama@gmail.com", status: "Inactive", joinedDate: "15 Feb 2025", totalTransactions: 6750000 },
  { id: "m-5", memberCode: "LRS-005", fullName: "Rina Wulandari", email: "rina.wulandari@gmail.com", status: "Active", joinedDate: "22 Feb 2025", totalTransactions: 15000000 },
  { id: "m-6", memberCode: "LRS-006", fullName: "Fajar Nugroho", email: "fajar.nugroho@gmail.com", status: "Active", joinedDate: "08 Mar 2025", totalTransactions: 21500000 },
  { id: "m-7", memberCode: "LRS-007", fullName: "Maya Permatasari", email: "maya.permatasari@gmail.com", status: "Inactive", joinedDate: "19 Mar 2025", totalTransactions: 4500000 },
  { id: "m-8", memberCode: "LRS-008", fullName: "Hendra Wijaya", email: "hendra.wijaya@gmail.com", status: "Active", joinedDate: "06 Apr 2025", totalTransactions: 28000000 },
  { id: "m-9", memberCode: "LRS-009", fullName: "Nadia Putri", email: "nadia.putri@gmail.com", status: "Active", joinedDate: "14 Apr 2025", totalTransactions: 12750000 },
  { id: "m-10", memberCode: "LRS-010", fullName: "Rizky Maulana", email: "rizky.maulana@gmail.com", status: "Inactive", joinedDate: "27 Apr 2025", totalTransactions: 3250000 },
  { id: "m-11", memberCode: "LRS-011", fullName: "Kartika Sari", email: "kartika.sari@gmail.com", status: "Active", joinedDate: "04 Mei 2025", totalTransactions: 19200000 },
  { id: "m-12", memberCode: "LRS-012", fullName: "Dimas Saputra", email: "dimas.saputra@gmail.com", status: "Active", joinedDate: "16 Mei 2025", totalTransactions: 14800000 },
  { id: "m-13", memberCode: "LRS-013", fullName: "Lestari Handayani", email: "lestari.handayani@gmail.com", status: "Active", joinedDate: "29 Mei 2025", totalTransactions: 26400000 },
  { id: "m-14", memberCode: "LRS-014", fullName: "Arif Hidayat", email: "arif.hidayat@gmail.com", status: "Inactive", joinedDate: "11 Jun 2025", totalTransactions: 5100000 },
  { id: "m-15", memberCode: "LRS-015", fullName: "Putri Maharani", email: "putri.maharani@gmail.com", status: "Active", joinedDate: "21 Jun 2025", totalTransactions: 22900000 },
];

export async function getSalesReportApi(
  period: string = "Oktober 2026"
): Promise<SalesReportResponse> {
  try {
    return await apiRequest<SalesReportResponse>(
      `/management/sales?period=${encodeURIComponent(period)}`
    );
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    return SALES_BY_PERIOD[period] ?? SALES_BY_PERIOD["Oktober 2026"];
  }
}

export async function getMembershipsApi(): Promise<MembershipResponse> {
  try {
    return await apiRequest<MembershipResponse>("/management/memberships");
  } catch (err) {
    if (!USE_MOCK_FALLBACK) throw err;
    return {
      totalRegistered: 108,
      activeCount: 84,
      inactiveCount: 24,
      asOfLabel: "Total transaksi kumulatif hingga 31 Okt 2026",
      members: BASE_MEMBERS,
    };
  }
}
