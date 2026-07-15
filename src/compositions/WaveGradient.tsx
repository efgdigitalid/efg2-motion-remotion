import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type WaveGradientProps = {
  theme: keyof typeof THEMES;
  waveCount: number;
  speed: number;
  amplitude: number; // 0..1 relatif terhadap tinggi frame
};

export const waveGradientDefaultProps: WaveGradientProps = {
  theme: "emeraldLux",
  waveCount: 4,
  speed: 1,
  amplitude: 0.12,
};

const buildWavePath = (
  width: number,
  height: number,
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number
) => {
  const points: string[] = [`M 0 ${height}`];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y = baseY + Math.sin((i / steps) * Math.PI * 2 * frequency + phase) * amplitude;
    points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  points.push(`L ${width} ${height}`, "Z");
  return points.join(" ");
};

export const WaveGradient: React.FC<WaveGradientProps> = ({
  theme,
  waveCount,
  speed,
  amplitude,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const themeData = THEMES[theme];
  const amp = height * amplitude;

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {new Array(waveCount).fill(0).map((_, i) => {
          const layerT = i / Math.max(waveCount - 1, 1);
          const baseY = height * (0.55 + layerT * 0.3);
          // fase bergerak penuh 2*PI selama durasi -> seamless loop
          const phase = t * Math.PI * 2 * speed + layerT * Math.PI;
          const color = sampleGradient(themeData.colors, layerT + t * 0.1);
          const path = buildWavePath(width, height, baseY, amp * (1 - layerT * 0.3), 1.5 + i * 0.4, phase);

          return <path key={i} d={path} fill={color} opacity={0.55 - layerT * 0.15} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
