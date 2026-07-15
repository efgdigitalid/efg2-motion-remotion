import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { THEMES, sampleGradient } from "../theme";
import { pseudoNoise2D } from "../noise";

export type AuroraFlowProps = {
  theme: keyof typeof THEMES;
  bandCount: number;
  flowSpeed: number;
};

export const auroraFlowDefaultProps: AuroraFlowProps = {
  theme: "forestGreen",
  bandCount: 4,
  flowSpeed: 1,
};

const buildBandPath = (
  width: number,
  height: number,
  baseY: number,
  ampY: number,
  t: number,
  seed: number
) => {
  const steps = 30;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const n = pseudoNoise2D(i * 0.3 + t * Math.PI * 2, seed, seed);
    const y = baseY + n * ampY;
    top.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${(y - 40).toFixed(1)}`);
    bottom.unshift(`L ${x.toFixed(1)} ${(y + 40).toFixed(1)}`);
  }
  return [...top, ...bottom, "Z"].join(" ");
};

export const AuroraFlow: React.FC<AuroraFlowProps> = ({
  theme,
  bandCount,
  flowSpeed,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * flowSpeed;
  const themeData = THEMES[theme];

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="auroraBlur">
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>
        <g filter="url(#auroraBlur)">
          {new Array(bandCount).fill(0).map((_, i) => {
            const layerT = i / Math.max(bandCount - 1, 1);
            const baseY = height * (0.25 + layerT * 0.4);
            const color = sampleGradient(themeData.colors, layerT + t * 0.15);
            const path = buildBandPath(width, height, baseY, height * 0.15, t, i * 7.3);
            return <path key={i} d={path} fill={color} opacity={0.35} />;
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
