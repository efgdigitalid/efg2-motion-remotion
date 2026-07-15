import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type StarfieldWarpProps = {
  theme: keyof typeof THEMES;
  starCount: number;
  warpSpeed: number; // 0 = statis, 1 = normal, 2+ = warp cepat
};

export const starfieldWarpDefaultProps: StarfieldWarpProps = {
  theme: "galaxyPurple",
  starCount: 200,
  warpSpeed: 1,
};

export const StarfieldWarp: React.FC<StarfieldWarpProps> = ({
  theme,
  starCount,
  warpSpeed,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const themeData = THEMES[theme];
  const cx = width / 2;
  const cy = height / 2;

  const stars = useMemo(
    () =>
      new Array(starCount).fill(0).map((_, i) => ({
        angle: random(`a-${i}`) * Math.PI * 2,
        startDist: random(`d-${i}`),
        speedMult: 0.5 + random(`sm-${i}`) * 1,
        size: 1 + random(`sz-${i}`) * 2.5,
      })),
    [starCount]
  );

  const maxDist = Math.sqrt(cx * cx + cy * cy);

  return (
    <AbsoluteFill style={{ background: themeData.background, overflow: "hidden" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {stars.map((s, i) => {
          // Loop mulus: progress 0..1 lalu wrap, dikombinasi dgn offset per bintang
          const progress = ((t * warpSpeed * s.speedMult + s.startDist) % 1);
          const dist = progress * maxDist;
          const x = cx + Math.cos(s.angle) * dist;
          const y = cy + Math.sin(s.angle) * dist;

          // Ekor/trail memanjang seiring makin jauh dari pusat (kesan warp speed)
          const trailLength = progress * 40 * warpSpeed;
          const tailX = cx + Math.cos(s.angle) * (dist - trailLength);
          const tailY = cy + Math.sin(s.angle) * (dist - trailLength);

          const color = sampleGradient(themeData.colors, progress);
          const opacity = Math.min(1, progress * 2) * (1 - Math.max(0, progress - 0.85) * 6);

          return (
            <line
              key={i}
              x1={tailX}
              y1={tailY}
              x2={x}
              y2={y}
              stroke={color}
              strokeWidth={s.size}
              strokeLinecap="round"
              opacity={Math.max(0, opacity)}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
