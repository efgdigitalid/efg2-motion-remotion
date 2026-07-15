import { ParticleFlow, particleFlowDefaultProps } from "../../src/compositions/ParticleFlow";
import { GeometricLoop, geometricLoopDefaultProps } from "../../src/compositions/GeometricLoop";
import { WaveGradient, waveGradientDefaultProps } from "../../src/compositions/WaveGradient";
import { LightRays, lightRaysDefaultProps } from "../../src/compositions/LightRays";
import { LiquidBlob, liquidBlobDefaultProps } from "../../src/compositions/LiquidBlob";
import { StarfieldWarp, starfieldWarpDefaultProps } from "../../src/compositions/StarfieldWarp";
import { AuroraFlow, auroraFlowDefaultProps } from "../../src/compositions/AuroraFlow";
import { NetworkLines, networkLinesDefaultProps } from "../../src/compositions/NetworkLines";
import { KaleidoscopeLoop, kaleidoscopeLoopDefaultProps } from "../../src/compositions/KaleidoscopeLoop";
import { SmokeFog, smokeFogDefaultProps } from "../../src/compositions/SmokeFog";
import { GlitchGrid, glitchGridDefaultProps } from "../../src/compositions/GlitchGrid";
import { TitleIntro, titleIntroDefaultProps } from "../../src/compositions/TitleIntro";

export const REGISTRY = [
  { id: "ParticleFlow", label: "Particle Flow", component: ParticleFlow, defaultProps: particleFlowDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "GeometricLoop", label: "Geometric Loop", component: GeometricLoop, defaultProps: geometricLoopDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "WaveGradient", label: "Wave Gradient", component: WaveGradient, defaultProps: waveGradientDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "LightRays", label: "Light Rays", component: LightRays, defaultProps: lightRaysDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "LiquidBlob", label: "Liquid Blob", component: LiquidBlob, defaultProps: liquidBlobDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "StarfieldWarp", label: "Starfield Warp", component: StarfieldWarp, defaultProps: starfieldWarpDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "AuroraFlow", label: "Aurora Flow", component: AuroraFlow, defaultProps: auroraFlowDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "NetworkLines", label: "Network Lines", component: NetworkLines, defaultProps: networkLinesDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "KaleidoscopeLoop", label: "Kaleidoscope Loop", component: KaleidoscopeLoop, defaultProps: kaleidoscopeLoopDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "SmokeFog", label: "Smoke Fog", component: SmokeFog, defaultProps: smokeFogDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "GlitchGrid", label: "Glitch Grid", component: GlitchGrid, defaultProps: glitchGridDefaultProps, width: 3840, height: 2160, durationInFrames: 360 },
  { id: "TitleIntro", label: "Title Intro", component: TitleIntro, defaultProps: titleIntroDefaultProps, width: 1920, height: 1080, durationInFrames: 150 },
] as const;

export const THEME_NAMES = [
  "sunsetGold",
  "oceanBlue",
  "neonCyberpunk",
  "emeraldLux",
  "monoMinimal",
  "pastelDream",
  "fireRed",
  "iceWhite",
  "galaxyPurple",
  "forestGreen",
  "roseGold",
  "midnightIndigo",
] as const;
