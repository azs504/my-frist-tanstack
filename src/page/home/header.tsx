import { BaseLabel } from "#/components/labels.tsx";
import { GoSearch } from "react-icons/go";
import { CiLogin } from "react-icons/ci";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="container mx-auto flex flex-row items-center justify-between px-8 py-3">
        <div className="flex flex-row items-center gap-2">
          <BaseLabel color="DarkRed">
            <p>租屋</p>
          </BaseLabel>

          <h1 className="font-bold text-white">公開誌</h1>
        </div>

        <div className="relative w-96">
          <input
            type="text"
            placeholder="搜尋文章、標籤..."
            className="w-full rounded-2xl border border-[#45403B] bg-[#1D1918] px-4 py-1 text-white outline-none focus:border-[#7E7771]"
          />
          <GoSearch className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400" />
        </div>

        <div className="flex cursor-pointer items-center gap-2 text-[#D7D3D1] hover:text-white">
          <CiLogin />
          <p>登入</p>
        </div>
      </div>
    </header>
  );
}
