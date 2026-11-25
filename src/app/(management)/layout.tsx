import React from "react";
import { ManagementSidebar } from "@/components/management/ManagementSidebar";
import { ManagementTopbar } from "@/components/management/ManagementTopbar";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#C9B99A] text-[#18352B]">
      <ManagementSidebar />
      <div className="pl-60 flex min-h-screen flex-col">
        <ManagementTopbar />
        <main className="flex-1 px-8 py-7">{children}</main>
        <footer className="mt-auto border-t border-[#18352B]/20 px-8 py-4 text-[11px] text-[#18352B]/70 flex items-center justify-between">
          <span>© 2026 Layah Katering. Seluruh hak dilindungi.</span>
          <span>Terakhir diperbarui: 31 Okt 2026, 18.00 WIB</span>
        </footer>
      </div>
    </div>
  );
}
