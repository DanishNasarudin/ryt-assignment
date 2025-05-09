import colors from "tailwindcss/colors";

type Colors = typeof colors;

type TailwindColorKeys = {
  [C in keyof Colors & string]: Colors[C] extends Record<string, string>
    ? `${C}-${keyof Colors[C] & string}`
    : never;
}[keyof Colors & string];

const customColors = {
  accent: {
    light: "hsl(211,100%,50%)", // #007BFF
    dark: "hsl(208,95.6%,55.3%)", // #2094FA
  },
  "accent-foreground": {
    light: "hsl(211,100%,40%)", // #0063CC
    dark: "hsl(208,95.6%,60%)", // #379FFA
  },
  background: {
    light: "hsl(0, 0%, 100%)",
    dark: "hsl(240, 10%, 3.9%)",
  },
  foreground: {
    light: "hsl(240, 10%, 3.9%)",
    dark: "hsl(0, 0%, 100%)",
  },
  secondary: {
    light: "hsl(240, 4.8%, 95.9%)",
    dark: "hsl(240, 3.7%, 15.9%)",
  },
  "secondary-foreground": {
    light: "hsl(240, 5.9%, 10%)",
    dark: "hsl(0, 0%, 98%)",
  },
} as const;

type CustomKey = keyof typeof customColors;

export function tailwindToHex(
  key: TailwindColorKeys,
  theme: "light" | "dark"
): string;
export function tailwindToHex(key: CustomKey, theme: "light" | "dark"): string;
export function tailwindToHex(
  key: TailwindColorKeys | CustomKey,
  theme: "light" | "dark" = "light"
): string {
  if (key in customColors) {
    return hslStringToHex(customColors[key as CustomKey][theme]);
  }
  const [c, s] = key.split("-") as [keyof Colors & string, string];
  const hex = (colors[c] as Record<string, string>)[s];
  if (!hex) throw new Error(`Unknown Tailwind color: "${key}"`);
  return hex;
}

function hslStringToHex(hsl: string): string {
  const m = hsl.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
  if (!m) throw new Error(`Invalid HSL: "${hsl}"`);
  const h = parseFloat(m[1]) / 360;
  const s = parseFloat(m[2]) / 100;
  const l = parseFloat(m[3]) / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
