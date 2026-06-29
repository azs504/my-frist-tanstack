import { twMerge } from "tailwind-merge";

const Color = {
  DarkRed: "#B91C1C",
} as const;

export function BaseLabel({
  color = "DarkRed",
  borderRadius,
  className,
  children,
}: {
  color?: keyof typeof Color;
  borderRadius?: React.CSSProperties["borderRadius"];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="rounded-full px-3 py-1"
        style={{ backgroundColor: Color[color], borderRadius }}
      >
        <p className={twMerge("text-xs text-white", className)}>{children}</p>
      </div>
    </div>
  );
}
