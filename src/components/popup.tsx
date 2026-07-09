import { twMerge } from "tailwind-merge";
import { IoIosClose } from "react-icons/io";

export function Popup({
  children,
  display = false,
  onClose,
  blur = true,
}: {
  children: React.ReactNode;
  display?: boolean;
  onClose?: () => void;
  blur?: boolean;
}) {
  return (
    <div
      onClick={onClose}
      className={twMerge(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        blur && "backdrop-blur-sm",
        !display && "hidden",
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-in-bottom relative rounded-2xl bg-white p-6"
      >
        <div className="flex w-full justify-end text-gray-500 hover:text-gray-700">
          <IoIosClose onClick={onClose} className="cursor-pointer" size={40} />
        </div>
        {children}
      </div>
    </div>
  );
}
