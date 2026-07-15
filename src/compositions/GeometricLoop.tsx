import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type GeometricLoopProps = {
  theme: keyof typeof THEMES;
  ringCount: number;
  rotationSpeed: number; // rotasi penuh per loop, mis. 1 = satu putaran penuh selama durasi
  shape: "circle" | "triangle" | "square";
};

export const geometricLoopDefaultProps: GeometricLoopProps = {
  theme: "neonCyberpunk",
  ringCount: 6,
  rotationSpeed: 1,
  shape: "circle",
};

const polygonPoints = (sides: number, radius: number, cx: number, cy: number) => {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return pts.join(" ");
};

export const GeometricLoop: React.FC<GeometricLoopProps> = ({
  theme,
  ringCount,
  rotationSpeed,
  shape,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0..1, dipakai supaya rotasi genap -> loop mulus

  const themeData = THEMES[theme];
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.min(width, height) * 0.42;

  const rings = useMemo(
    () =>
      new Array(ringCount).fill(0).map((_, i) => ({
        seed: i * 12.9,
        radiusRatio: (i + 1) / ringCount,
        reverse: i % 2 === 0,
        strokeWidth: 2 + random(`sw-${i}`) * 4,
      })),
    [ringCount]
  );

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {rings.map((ring, i) => {
          const radius = maxRadius * ring.radiusRatio;
          const dir = ring.reverse ? -1 : 1;
          const angleDeg = dir * rotationSpeed * t * 360;
          const color = sampleGradient(themeData.colors, ring.radiusRatio + t * 0.15);

          const shapeEl =
            shape === "circle" ? (
              <circle cx={cx} cy={cy} r={radius} fill="none" stroke={color} strokeWidth={ring.strokeWidth} opacity={0.8} />
            ) : (
              <polygon
                points={polygonPoints(shape === "triangle" ? 3 : 4, radius, cx, cy)}
                fill="none"
                stroke={color}
                strokeWidth={ring.strokeWidth}
                opacity={0.8}
              />
            );

          return (
            <g key={i} transform={`rotate(${angleDeg} ${cx} ${cy})`}>
              {shapeEl}
            </g>
          );
        })}
        {/* Titik pusat bercahaya */}
        <circle cx={cx} cy={cy} r={maxRadius * 0.06} fill={sampleGradient(themeData.colors, t)} opacity={0.9} />
      </svg>
    </AbsoluteFill>
  );
};
