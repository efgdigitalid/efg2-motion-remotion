import React from "react";
import { Composition } from "remotion";
import { ParticleFlow, particleFlowDefaultProps } from "./compositions/ParticleFlow";
import { GeometricLoop, geometricLoopDefaultProps } from "./compositions/GeometricLoop";
import { WaveGradient, waveGradientDefaultProps } from "./compositions/WaveGradient";
import { LightRays, lightRaysDefaultProps } from "./compositions/LightRays";
import { LiquidBlob, liquidBlobDefaultProps } from "./compositions/LiquidBlob";
import { StarfieldWarp, starfieldWarpDefaultProps } from "./compositions/StarfieldWarp";
import { AuroraFlow, auroraFlowDefaultProps } from "./compositions/AuroraFlow";
import { NetworkLines, networkLinesDefaultProps } from "./compositions/NetworkLines";
import { KaleidoscopeLoop, kaleidoscopeLoopDefaultProps } from "./compositions/KaleidoscopeLoop";
import { SmokeFog, smokeFogDefaultProps } from "./compositions/SmokeFog";
import { GlitchGrid, glitchGridDefaultProps } from "./compositions/GlitchGrid";
import { TitleIntro, titleIntroDefaultProps } from "./compositions/TitleIntro";

// Stock footage umumnya: 4K (3840x2160), 30fps, durasi 10-15 detik, seamless loop
const FPS = 30;
const LOOP_DURATION_IN_FRAMES = FPS * 12; // 12 detik, untuk komposisi seamless loop
const INTRO_DURATION_IN_FRAMES = FPS * 5; // 5 detik, untuk komposisi title/intro (bukan loop)

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ParticleFlow" component={ParticleFlow} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={particleFlowDefaultProps} />
      <Composition id="GeometricLoop" component={GeometricLoop} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={geometricLoopDefaultProps} />
      <Composition id="WaveGradient" component={WaveGradient} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={waveGradientDefaultProps} />
      <Composition id="LightRays" component={LightRays} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={lightRaysDefaultProps} />
      <Composition id="LiquidBlob" component={LiquidBlob} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={liquidBlobDefaultProps} />
      <Composition id="StarfieldWarp" component={StarfieldWarp} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={starfieldWarpDefaultProps} />
      <Composition id="AuroraFlow" component={AuroraFlow} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={auroraFlowDefaultProps} />
      <Composition id="NetworkLines" component={NetworkLines} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={networkLinesDefaultProps} />
      <Composition id="KaleidoscopeLoop" component={KaleidoscopeLoop} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={kaleidoscopeLoopDefaultProps} />
      <Composition id="SmokeFog" component={SmokeFog} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={smokeFogDefaultProps} />
      <Composition id="GlitchGrid" component={GlitchGrid} durationInFrames={LOOP_DURATION_IN_FRAMES} fps={FPS} width={3840} height={2160} defaultProps={glitchGridDefaultProps} />
      <Composition id="TitleIntro" component={TitleIntro} durationInFrames={INTRO_DURATION_IN_FRAMES} fps={FPS} width={1920} height={1080} defaultProps={titleIntroDefaultProps} />
    </>
  );
};
