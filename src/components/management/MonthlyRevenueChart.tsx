import React from "react";
import { TrendingUp } from "lucide-react";
import { formatRupiah } from "@/lib/utils/format";
import type { MonthlyRevenuePoint } from "@/types/management";

interface MonthlyRevenueChartProps {
  data: MonthlyRevenuePoint[];
  highlightNote: string;
  ytdTotalRevenue: number;
}

const Y_TICKS = [120, 90, 60, 30, 0];

export function MonthlyRevenueChart({
  data,
  highlightNote,
  ytdTotalRevenue,
}: MonthlyRevenueChartProps) {
  const maxVal = 120;

  return (
    <div className="rounded-lg border border-[#18352B]/35 bg-[#C9B99A] p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#18352B] font-sans">
            Tren Penjualan Bulanan
          </h2>
          <p className="mt-0.5 text-xs text-[#18352B]/70">
            Pendapatan bersih · dalam juta rupiah (Rp)
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#18352B]/80">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#18352B]" />
          Pendapatan 2026
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="mt-7 relative">
        <div className="relative h-60 flex flex-col justify-between">
          {Y_TICKS.map((tick) => (
            <div key={tick} className="flex items-center gap-3">
              <span className="w-7 text-right text-[10px] text-[#18352B]/65">
                {tick}
              </span>
              <div className="flex-1 border-t border-[#18352B]/25" />
            </div>
          ))}

          {/* Bars Overlay */}
          <div className="absolute inset-y-0 left-10 right-2 flex items-end justify-between gap-2 sm:gap-4 pb-2 pt-2">
            {data.map((point) => {
              const heightPct = Math.min(
                100,
                Math.round((point.revenueMillions / maxVal) * 100)
              );

              return (
                <div
                  key={point.month}
                  className="flex h-full flex-1 flex-col items-center justify-end group"
                >
                  <div
                    className={`w-full max-w-[44px] rounded-t-xs transition-all duration-300 flex items-start justify-center pt-1.5 ${
                      point.isCurrent
                        ? "bg-[#18352B] ring-2 ring-[#641E2A]/40"
                        : "bg-[#18352B]/90 group-hover:bg-[#641E2A]"
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={`${point.month} 2026: Rp${point.revenueMillions}.000.000`}
                  >
                    <span className="text-[10px] font-semibold text-[#C9B99A]">
                      {point.revenueMillions}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="mt-2.5 ml-10 mr-2 flex items-center justify-between gap-2 sm:gap-4">
          {data.map((point) => (
            <span
              key={point.month}
              className={`flex-1 text-center text-[11px] ${
                point.isCurrent
                  ? "font-bold text-[#18352B]"
                  : "text-[#18352B]/75"
              }`}
            >
              {point.month}
            </span>
          ))}
        </div>
      </div>

      {/* Footer insight */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#18352B]/20 pt-4 text-xs text-[#18352B]/80">
        <span className="inline-flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-[#18352B]" />
          {highlightNote}
        </span>
        <span className="font-semibold text-[#18352B]">
          Total Jan–Okt: {formatRupiah(ytdTotalRevenue)}
        </span>
      </div>
    </div>
  );
}
