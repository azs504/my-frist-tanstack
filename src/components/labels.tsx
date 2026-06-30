import { twMerge } from "tailwind-merge";

export const Color = {
  DarkRed: "#B91C1C",
  Pink: "#FFE2E2",
  LightYellow: "#FFF9C1",
  LightBlue: "#B3D9FF",
  LightGreen: "#B3FFB3",
  LightGray: "#EDE9E2",
} as const;

export function BaseLabel({
  color = "DarkRed",
  border,
  borderRadius,
  borderColor,
  className,
  children,
}: {
  color?: keyof typeof Color;
  border?: React.CSSProperties["border"];
  borderRadius?: React.CSSProperties["borderRadius"];
  borderColor?: React.CSSProperties["borderColor"];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="rounded-full px-3 py-1"
        style={{
          backgroundColor: Color[color],
          borderRadius,
          borderColor,
          border,
        }}
      >
        <p className={twMerge("text-xs text-white", className)}>{children}</p>
      </div>
    </div>
  );
}
