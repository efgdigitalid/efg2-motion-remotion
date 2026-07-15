import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type GlitchGridProps = {
  theme: keyof typeof THEMES;
  cols: number;
  rows: number;
  glitchIntensity: number; // 0..1
};

export const glitchGridDefaultProps: GlitchGridProps = {
  theme: "neonCyberpunk",
  cols: 16,
  rows: 9,
  glitchIntensity: 0.5,
};

export const GlitchGrid: React.FC<GlitchGridProps> = ({
  theme,
  cols,
  rows,
  glitchIntensity,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const themeData = THEMES[theme];
  const cellW = width / cols;
  const cellH = height / rows;

  const cells = useMemo(
    () =>
      new Array(cols * rows).fill(0).map((_, i) => ({
        seed: i * 3.3,
        activeThreshold: random(`act-${i}`),
      })),
    [cols, rows]
  );

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* garis grid dasar, redup */}
        {new Array(cols + 1).fill(0).map((_, i) => (
          <line key={`v-${i}`} x1={i * cellW} y1={0} x2={i * cellW} y2={height} stroke={themeData.colors[0]} strokeWidth={1} opacity={0.08} />
        ))}
        {new Array(rows + 1).fill(0).map((_, i) => (
          <line key={`h-${i}`} x1={0} y1={i * cellH} x2={width} y2={i * cellH} stroke={themeData.colors[0]} strokeWidth={1} opacity={0.08} />
        ))}

        {cells.map((c, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          // Flicker pseudo-random berbasis frame, dibuat periodik terhadap durationInFrames supaya loop mulus
          const cycle = Math.sin(t * Math.PI * 2 * (2 + (i % 5)) + c.seed);
          const isActive = cycle > 1 - glitchIntensity * 1.4 - c.activeThreshold * 0.3;
          if (!isActive) return null;

          const color = sampleGradient(themeData.colors, (col + row) / (cols + rows) + t * 0.2);
          // Glitch offset horizontal sesekali
          const glitchOffset = cycle > 0.9 ? (random(`go-${i}-${Math.floor(frame / 3)}`) - 0.5) * cellW * 1.5 : 0;

          return (
            <rect
              key={i}
              x={col * cellW + glitchOffset}
              y={row * cellH}
              width={cellW * 0.92}
              height={cellH * 0.92}
              fill={color}
              opacity={0.5}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
