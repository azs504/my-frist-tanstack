import { BaseLabel } from "#/components/labels.tsx";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 bg-black py-6">
      <div className="flex flex-row items-center justify-center gap-2">
        <BaseLabel color="DarkRed">租屋</BaseLabel>

        <h1 className="font-bold text-white">公開誌</h1>
      </div>

      <p className="text-sm text-[#78716B]">
        讓台灣租屋市場更透明、更公平 — 2026
      </p>
    </footer>
  );
}
