import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { THEMES, sampleGradient } from "../theme";

export type TitleIntroProps = {
  theme: keyof typeof THEMES;
  title: string;
  subtitle: string;
};

export const titleIntroDefaultProps: TitleIntroProps = {
  theme: "midnightIndigo",
  title: "EFG DIGITAL",
  subtitle: "Motion Graphics & Creative Tools",
};

export const TitleIntro: React.FC<TitleIntroProps> = ({
  theme,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const themeData = THEMES[theme];

  const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const titleY = interpolate(entrance, [0, 1], [40, 0]);
  const titleOpacity = entrance;

  const subtitleEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const subtitleOpacity = subtitleEntrance;
  const subtitleY = interpolate(subtitleEntrance, [0, 1], [20, 0]);

  // Fade out di akhir (10 frame terakhir)
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const t = frame / durationInFrames;
  const glowColor = sampleGradient(themeData.colors, t);

  // Garis dekoratif yang melebar dari tengah
  const lineWidth = interpolate(entrance, [0, 1], [0, width * 0.3]);

  return (
    <AbsoluteFill
      style={{
        background: themeData.background,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          fontFamily: "Arial, sans-serif",
          fontWeight: 800,
          fontSize: width * 0.075,
          letterSpacing: 6,
          color: "#FFFFFF",
          textShadow: `0 0 40px ${glowColor}`,
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: lineWidth,
          height: 3,
          background: glowColor,
          margin: "18px 0",
          boxShadow: `0 0 20px ${glowColor}`,
        }}
      />

      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          fontFamily: "Arial, sans-serif",
          fontWeight: 400,
          fontSize: width * 0.022,
          letterSpacing: 3,
          color: "#CCCCCC",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
