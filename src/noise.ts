// Pseudo-noise berbasis kombinasi sinus - cukup untuk efek organik (aurora, smoke)
// tanpa perlu tambah dependency @remotion/noise.
export const pseudoNoise2D = (x: number, y: number, seed = 0): number => {
  const n =
    Math.sin(x * 1.3 + seed) * 0.5 +
    Math.sin(y * 2.1 - seed * 1.7) * 0.3 +
    Math.sin((x + y) * 0.7 + seed * 0.5) * 0.2;
  return n; // kira-kira dalam rentang -1..1
};
