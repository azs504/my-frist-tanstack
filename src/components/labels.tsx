const Color = {
  DarkRed: "#B91C1C",
} as const;

export function BaseLabel({
  color = "DarkRed",
  children,
}: {
  color?: keyof typeof Color;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className="rounded-full px-3 py-1"
        style={{ backgroundColor: Color[color] }}
      >
        <p className="text-xs text-white">{children}</p>
      </div>
    </div>
  );
}
