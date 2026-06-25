interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "color" | "white";
}

const LETRAS = [
  { char: "s", color: "#FA4616" },
  { char: "i", color: "#84329B" },
  { char: "c", color: "#00A9E0" },
  { char: "o", color: "#00A499" },
  { char: "b", color: "#FFA300" },
  { char: "e", color: "#E31C79" },
  { char: "n", color: "#84BD00" },
];

const SIZES: Record<NonNullable<Props["size"]>, string> = {
  xs: "text-xl",
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

export default function LogoSicoben({ size = "md", className = "", variant = "color" }: Props) {
  return (
    <span
      className={`${SIZES[size]} leading-none tracking-tight select-none ${className}`}
      style={{ fontFamily: "var(--font-nunito), 'Arial Rounded MT Bold', sans-serif", fontWeight: 900 }}
    >
      {LETRAS.map(({ char, color }) => (
        <span key={char} style={{ color: variant === "white" ? "#ffffff" : color }}>
          {char}
        </span>
      ))}
    </span>
  );
}
