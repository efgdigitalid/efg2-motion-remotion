import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type LiquidBlobProps = {
  theme: keyof typeof THEMES;
  blobCount: number;
  morphSpeed: number;
  pointCount: number; // makin banyak, makin halus bentuknya
};

export const liquidBlobDefaultProps: LiquidBlobProps = {
  theme: "iceWhite",
  blobCount: 3,
  morphSpeed: 1,
  pointCount: 8,
};

// Buat path blob organik dari titik-titik yang bergerak radial dengan noise sinus
const buildBlobPath = (
  cx: number,
  cy: number,
  baseRadius: number,
  pointCount: number,
  t: number,
  seed: number
): string => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2;
    const wobble =
      Math.sin(angle * 3 + t * Math.PI * 2 + seed) * 0.15 +
      Math.sin(angle * 5 - t * Math.PI * 2 + seed * 2) * 0.08;
    const r = baseRadius * (1 + wobble);
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }

  // Catmull-Rom -> smooth cubic bezier supaya bentuknya organik, bukan polygon patah-patah
  let d = `M ${points[0].x} ${points[0].y} `;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} `;
  }
  return d + "Z";
};

export const LiquidBlob: React.FC<LiquidBlobProps> = ({
  theme,
  blobCount,
  morphSpeed,
  pointCount,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * morphSpeed;
  const themeData = THEMES[theme];

  const blobs = useMemo(
    () =>
      new Array(blobCount).fill(0).map((_, i) => ({
        cx: width * (0.25 + random(`bx-${i}`) * 0.5),
        cy: height * (0.25 + random(`by-${i}`) * 0.5),
        radius: Math.min(width, height) * (0.15 + random(`br-${i}`) * 0.15),
        seed: random(`bs-${i}`) * 100,
      })),
    [blobCount, width, height]
  );

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="blobBlur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <g filter="url(#blobBlur)">
          {blobs.map((b, i) => {
            const color = sampleGradient(themeData.colors, i / blobCount + t * 0.2);
            const path = buildBlobPath(b.cx, b.cy, b.radius, pointCount, t, b.seed);
            return <path key={i} d={path} fill={color} opacity={0.75} />;
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
