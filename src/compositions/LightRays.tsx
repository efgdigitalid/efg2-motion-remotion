import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type LightRaysProps = {
  theme: keyof typeof THEMES;
  rayCount: number;
  rotationSpeed: number;
  bokehCount: number;
};

export const lightRaysDefaultProps: LightRaysProps = {
  theme: "roseGold",
  rayCount: 14,
  rotationSpeed: 0.3,
  bokehCount: 24,
};

export const LightRays: React.FC<LightRaysProps> = ({
  theme,
  rayCount,
  rotationSpeed,
  bokehCount,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const themeData = THEMES[theme];
  const cx = width / 2;
  const cy = height * 0.35;

  const bokeh = useMemo(
    () =>
      new Array(bokehCount).fill(0).map((_, i) => ({
        x: random(`bx-${i}`) * width,
        y: random(`by-${i}`) * height,
        r: 20 + random(`br-${i}`) * 80,
        phase: random(`bp-${i}`) * Math.PI * 2,
        depth: random(`bd-${i}`),
      })),
    [bokehCount, width, height]
  );

  const angleOffset = t * 360 * rotationSpeed;

  return (
    <AbsoluteFill style={{ background: themeData.background, overflow: "hidden" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <radialGradient id="glowCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={sampleGradient(themeData.colors, t)} stopOpacity="0.9" />
            <stop offset="100%" stopColor={themeData.background} stopOpacity="0" />
          </radialGradient>
        </defs>

        <g transform={`rotate(${angleOffset} ${cx} ${cy})`}>
          {new Array(rayCount).fill(0).map((_, i) => {
            const rayAngle = (i / rayCount) * 360;
            const color = sampleGradient(themeData.colors, i / rayCount + t * 0.1);
            const length = Math.max(width, height) * 1.2;
            const rayWidth = 6 + (i % 3) * 4;
            return (
              <g key={i} transform={`rotate(${rayAngle} ${cx} ${cy})`}>
                <polygon
                  points={`${cx - rayWidth},${cy} ${cx + rayWidth},${cy} ${cx},${cy - length}`}
                  fill={color}
                  opacity={0.08 + (i % 2) * 0.05}
                />
              </g>
            );
          })}
        </g>

        <circle cx={cx} cy={cy} r={Math.min(width, height) * 0.25} fill="url(#glowCenter)" />

        {bokeh.map((b, i) => {
          const drift = Math.sin(t * Math.PI * 2 + b.phase) * 30;
          const color = sampleGradient(themeData.colors, b.depth);
          return (
            <circle
              key={i}
              cx={b.x + drift}
              cy={b.y - drift * 0.5}
              r={b.r}
              fill={color}
              opacity={0.05 + b.depth * 0.12}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
