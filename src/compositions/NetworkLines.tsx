import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type NetworkLinesProps = {
  theme: keyof typeof THEMES;
  nodeCount: number;
  connectDistance: number; // dalam px, jarak maksimum untuk garis penghubung
  speed: number;
};

export const networkLinesDefaultProps: NetworkLinesProps = {
  theme: "midnightIndigo",
  nodeCount: 45,
  connectDistance: 260,
  speed: 1,
};

export const NetworkLines: React.FC<NetworkLinesProps> = ({
  theme,
  nodeCount,
  connectDistance,
  speed,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const themeData = THEMES[theme];

  const nodesBase = useMemo(
    () =>
      new Array(nodeCount).fill(0).map((_, i) => ({
        x0: random(`x-${i}`) * width,
        y0: random(`y-${i}`) * height,
        driftAngle: random(`da-${i}`) * Math.PI * 2,
        driftRadius: 40 + random(`dr-${i}`) * 60,
        phase: random(`ph-${i}`) * Math.PI * 2,
      })),
    [nodeCount, width, height]
  );

  // Posisi node bergerak melayang perlahan (drift melingkar kecil) - seamless loop karena berbasis sin/cos periodik
  const nodes = nodesBase.map((n) => {
    const angle = n.phase + t * Math.PI * 2 * speed;
    return {
      x: n.x0 + Math.cos(angle + n.driftAngle) * n.driftRadius,
      y: n.y0 + Math.sin(angle + n.driftAngle) * n.driftRadius,
    };
  });

  const lines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectDistance) {
        lines.push({
          x1: nodes[i].x,
          y1: nodes[i].y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          opacity: 1 - dist / connectDistance,
        });
      }
    }
  }

  return (
    <AbsoluteFill style={{ background: themeData.background }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={sampleGradient(themeData.colors, l.opacity)}
            strokeWidth={1}
            opacity={l.opacity * 0.6}
          />
        ))}
        {nodes.map((n, i) => {
          const pulse = 0.6 + 0.4 * Math.sin((frame / fps) * 3 + i);
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={3}
              fill={sampleGradient(themeData.colors, i / nodes.length)}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
