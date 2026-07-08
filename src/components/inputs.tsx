import { twMerge } from "tailwind-merge";

export function BaseInput({
  value,
  type = "text",
  placeholder,
  className,
  onChange,
}: {
  type?: "text" | "email" | "password";
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={twMerge(
        "h-10 w-full rounded-xl border border-[#E5E8EB] bg-[#F9FAFC] px-4 py-1 text-[#1D1918] outline-none focus:border-[#7E7771]",
        className,
      )}
    />
  );
}
