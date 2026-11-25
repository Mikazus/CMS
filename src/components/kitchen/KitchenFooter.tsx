import React from "react";

interface KitchenFooterProps {
  lastSynced?: string;
}

export function KitchenFooter({ lastSynced = "10:42" }: KitchenFooterProps) {
  return (
    <footer className="mt-auto border-t border-[#18352B]/15 bg-[#C9B99A] px-8 py-3.5 text-[11px] text-[#18352B]/70">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <span>Layah Catering · Thoughtfully prepared, beautifully served.</span>
        <span className="inline-flex items-center gap-2 font-medium text-[#18352B]">
          <span className="h-2 w-2 rounded-full bg-[#18352B]" />
          Kitchen connected · Last synced {lastSynced}
        </span>
      </div>
    </footer>
  );
}
