import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type KaleidoscopeLoopProps = {
  theme: keyof typeof THEMES;
  segments: number; // jumlah simetri (6, 8, 12 biasanya paling bagus)
  shapeCount: number;
  rotationSpeed: number;
};

export const kaleidoscopeLoopDefaultProps: KaleidoscopeLoopProps = {
  theme: "neonCyberpunk",
  segments: 8,
  shapeCount: 10,
  rotationSpeed: 0.5,
};

export const KaleidoscopeLoop: React.FC<KaleidoscopeLoopProps> = ({
  theme,
  segments,
  shapeCount,
  rotationSpeed,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const themeData = THEMES[theme];
  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(width, height) * 0.48;

  const shapes = useMemo(
    () =>
      new Array(shapeCount).fill(0).map((_, i) => ({
        r: (i + 1) / shapeCount,
        angle0: random(`a-${i}`) * 360,
        size: 10 + random(`s-${i}`) * 30,
      })),
    [shapeCount]
  );

  const globalRotation = t * 360 * rotationSpeed;

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {new Array(segments).fill(0).map((_, segIndex) => {
          const segAngle = (360 / segments) * segIndex;
          const flip = segIndex % 2 === 1 ? -1 : 1;
          return (
            <g
              key={segIndex}
              transform={`rotate(${segAngle + globalRotation} ${cx} ${cy}) scale(${flip} 1)`}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              {shapes.map((s, i) => {
                const dist = s.r * maxR;
                const angle = ((s.angle0 + t * 90) * Math.PI) / 180;
                const x = cx + Math.cos(angle) * dist * 0.3 + dist * 0.7;
                const y = cy + Math.sin(angle) * dist * 0.3;
                const color = sampleGradient(themeData.colors, s.r + t * 0.2);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={s.size}
                    fill={color}
                    opacity={0.7}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
