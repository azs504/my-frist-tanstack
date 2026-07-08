import { twMerge } from "tailwind-merge";

export function BaseButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={twMerge(
        "rounded-xl bg-[#7E7771] px-4 py-2 text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <BaseButton
      className={twMerge("bg-[#B91C1C]", className)}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
