export type ColorTheme = {
  name: string;
  colors: string[]; // gradient stops, urutan dari colors[0] -> colors[n]
  background: string;
};

// Beberapa preset tema warna siap pakai untuk variasi cepat (Adobe Stock suka variasi warna dari 1 konsep)
export const THEMES: Record<string, ColorTheme> = {
  sunsetGold: {
    name: "Sunset Gold",
    colors: ["#FF6B35", "#F7C948", "#FFD9A0"],
    background: "#1A0F0A",
  },
  oceanBlue: {
    name: "Ocean Blue",
    colors: ["#00B4D8", "#0077B6", "#03045E"],
    background: "#000814",
  },
  neonCyberpunk: {
    name: "Neon Cyberpunk",
    colors: ["#FF00E5", "#00F0FF", "#7B2FF7"],
    background: "#0A0014",
  },
  emeraldLux: {
    name: "Emerald Luxury",
    colors: ["#00C896", "#00E0A4", "#D4AF37"],
    background: "#02110D",
  },
  monoMinimal: {
    name: "Mono Minimal",
    colors: ["#FFFFFF", "#CFCFCF", "#8A8A8A"],
    background: "#0B0B0B",
  },
  pastelDream: {
    name: "Pastel Dream",
    colors: ["#FFC6E0", "#C6E2FF", "#E0C6FF"],
    background: "#0F0B14",
  },
  fireRed: {
    name: "Fire Red",
    colors: ["#FF4E00", "#FF0000", "#FFB800"],
    background: "#140000",
  },
  iceWhite: {
    name: "Ice White",
    colors: ["#E6FBFF", "#A0E9FF", "#5DC8FF"],
    background: "#040B14",
  },
  galaxyPurple: {
    name: "Galaxy Purple",
    colors: ["#9D4EDD", "#5A189A", "#240046"],
    background: "#03000A",
  },
  forestGreen: {
    name: "Forest Green",
    colors: ["#2D6A4F", "#40916C", "#95D5B2"],
    background: "#081C15",
  },
  roseGold: {
    name: "Rose Gold",
    colors: ["#E8A0A0", "#D4AF37", "#F5D0C5"],
    background: "#1A0E0E",
  },
  midnightIndigo: {
    name: "Midnight Indigo",
    colors: ["#3A0CA3", "#4361EE", "#4CC9F0"],
    background: "#020024",
  },
};

export const lerpColor = (a: string, b: string, t: number): string => {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${bl})`;
};

// Ambil warna dari array gradient stops berdasarkan posisi 0..1, dengan wrap-around (untuk loop mulus)
export const sampleGradient = (colors: string[], t: number): string => {
  const n = colors.length;
  const pos = ((t % 1) + 1) % 1; // pastikan selalu 0..1
  const scaled = pos * n;
  const i = Math.floor(scaled) % n;
  const j = (i + 1) % n;
  const localT = scaled - Math.floor(scaled);
  return lerpColor(colors[i], colors[j], localT);
};
