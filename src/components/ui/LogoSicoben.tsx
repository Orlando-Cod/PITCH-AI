interface Props {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LETRAS = [
  { char: "s", color: "#D4518C" },
  { char: "i", color: "#7C3FA0" },
  { char: "c", color: "#6DB4E8" },
  { char: "o", color: "#4EA8AA" },
  { char: "b", color: "#F0A82A" },
  { char: "e", color: "#CC5C42" },
  { char: "n", color: "#8CC452" },
];

const SIZES: Record<NonNullable<Props["size"]>, string> = {
  xs: "text-xl",
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

export default function LogoSicoben({ size = "md", className = "" }: Props) {
  return (
    <span
      className={`${SIZES[size]} leading-none tracking-tight select-none ${className}`}
      style={{ fontFamily: "var(--font-nunito), 'Arial Rounded MT Bold', sans-serif", fontWeight: 900 }}
    >
      {LETRAS.map(({ char, color }) => (
        <span key={char} style={{ color }}>
          {char}
        </span>
      ))}
    </span>
  );
}
