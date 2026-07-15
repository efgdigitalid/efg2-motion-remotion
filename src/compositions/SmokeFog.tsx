import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";
import { pseudoNoise2D } from "../noise";

export type SmokeFogProps = {
  theme: keyof typeof THEMES;
  layerCount: number;
  driftSpeed: number;
};

export const smokeFogDefaultProps: SmokeFogProps = {
  theme: "monoMinimal",
  layerCount: 6,
  driftSpeed: 1,
};

export const SmokeFog: React.FC<SmokeFogProps> = ({
  theme,
  layerCount,
  driftSpeed,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * driftSpeed;
  const themeData = THEMES[theme];

  const layers = useMemo(
    () =>
      new Array(layerCount).fill(0).map((_, i) => ({
        seed: i * 5.5,
        baseX: random(`x-${i}`) * width,
        baseY: random(`y-${i}`) * height,
        size: Math.min(width, height) * (0.3 + random(`s-${i}`) * 0.35),
      })),
    [layerCount, width, height]
  );

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="smokeBlur">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
        <g filter="url(#smokeBlur)">
          {layers.map((l, i) => {
            // Noise periodik (fungsi sin/cos dari t) -> loop mulus tanpa "lompat" di akhir
            const nx = pseudoNoise2D(Math.cos(t * Math.PI * 2), Math.sin(t * Math.PI * 2), l.seed) * 150;
            const ny = pseudoNoise2D(Math.sin(t * Math.PI * 2), Math.cos(t * Math.PI * 2), l.seed + 10) * 100;
            const color = sampleGradient(themeData.colors, i / layers.length + t * 0.1);
            const opacity = 0.12 + 0.08 * Math.sin(t * Math.PI * 2 + l.seed);
            return (
              <ellipse
                key={i}
                cx={l.baseX + nx}
                cy={l.baseY + ny}
                rx={l.size}
                ry={l.size * 0.6}
                fill={color}
                opacity={Math.max(0.05, opacity)}
              />
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
