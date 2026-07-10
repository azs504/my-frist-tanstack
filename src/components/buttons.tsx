import { twMerge } from "tailwind-merge";

export function BaseButton({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-xl bg-[#7E7771] px-4 py-2 text-white disabled:opacity-50",
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
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <BaseButton
      className={twMerge("bg-[#B91C1C]", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  );
}

export function SecondaryButton({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <BaseButton
      className={twMerge("bg-[#7E7771]", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  );
}
