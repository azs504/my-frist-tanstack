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
        "fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/50",
        blur && "backdrop-blur-sm",
        !display && "hidden",
      )}
    >
      <div className="animate-slide-in-bottom relative rounded-2xl bg-white p-6">
        <button
          onClick={onClose}
          className="flex w-full cursor-pointer justify-end text-gray-500 hover:text-gray-700"
        >
          <IoIosClose size={36} />
        </button>
        {children}
      </div>
    </div>
  );
}
