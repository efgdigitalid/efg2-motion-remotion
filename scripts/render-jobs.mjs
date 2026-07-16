// Daftar variasi yang akan di-render otomatis oleh scripts/batch-render.mjs
// Tambah/kurangi item di sini untuk mengontrol berapa banyak file video yang dihasilkan.
export const RENDER_JOBS = [
  // --- ParticleFlow ---
  { composition: "ParticleFlow", outputName: "particleflow-ocean-up", props: { theme: "oceanBlue", particleCount: 140, speed: 1, particleSize: 6, direction: "up" } },
  { composition: "ParticleFlow", outputName: "particleflow-sunset-diagonal", props: { theme: "sunsetGold", particleCount: 160, speed: 0.8, particleSize: 5, direction: "diagonal" } },
  { composition: "ParticleFlow", outputName: "particleflow-neon-down", props: { theme: "neonCyberpunk", particleCount: 180, speed: 1.3, particleSize: 4, direction: "down" } },
  { composition: "ParticleFlow", outputName: "particleflow-mono-up", props: { theme: "monoMinimal", particleCount: 100, speed: 0.6, particleSize: 7, direction: "up" } },
  { composition: "ParticleFlow", outputName: "particleflow-galaxy-diagonal", props: { theme: "galaxyPurple", particleCount: 150, speed: 1, particleSize: 5, direction: "diagonal" } },

  // --- GeometricLoop ---
  { composition: "GeometricLoop", outputName: "geometric-neon-circle", props: { theme: "neonCyberpunk", ringCount: 6, rotationSpeed: 1, shape: "circle" } },
  { composition: "GeometricLoop", outputName: "geometric-emerald-triangle", props: { theme: "emeraldLux", ringCount: 5, rotationSpeed: 0.5, shape: "triangle" } },
  { composition: "GeometricLoop", outputName: "geometric-pastel-square", props: { theme: "pastelDream", ringCount: 7, rotationSpeed: 1.5, shape: "square" } },
  { composition: "GeometricLoop", outputName: "geometric-indigo-circle", props: { theme: "midnightIndigo", ringCount: 8, rotationSpeed: 0.8, shape: "circle" } },

  // --- WaveGradient ---
  { composition: "WaveGradient", outputName: "wave-emerald", props: { theme: "emeraldLux", waveCount: 4, speed: 1, amplitude: 0.12 } },
  { composition: "WaveGradient", outputName: "wave-ocean", props: { theme: "oceanBlue", waveCount: 5, speed: 0.7, amplitude: 0.18 } },
  { composition: "WaveGradient", outputName: "wave-pastel", props: { theme: "pastelDream", waveCount: 3, speed: 1.4, amplitude: 0.08 } },
  { composition: "WaveGradient", outputName: "wave-fire", props: { theme: "fireRed", waveCount: 4, speed: 1.1, amplitude: 0.15 } },

  // --- LightRays ---
  { composition: "LightRays", outputName: "lightrays-rosegold", props: { theme: "roseGold", rayCount: 14, rotationSpeed: 0.3, bokehCount: 24 } },
  { composition: "LightRays", outputName: "lightrays-icewhite", props: { theme: "iceWhite", rayCount: 18, rotationSpeed: 0.2, bokehCount: 30 } },
  { composition: "LightRays", outputName: "lightrays-fire", props: { theme: "fireRed", rayCount: 12, rotationSpeed: 0.4, bokehCount: 20 } },

  // --- LiquidBlob ---
  { composition: "LiquidBlob", outputName: "blob-icewhite", props: { theme: "iceWhite", blobCount: 3, morphSpeed: 1, pointCount: 8 } },
  { composition: "LiquidBlob", outputName: "blob-rosegold", props: { theme: "roseGold", blobCount: 4, morphSpeed: 0.7, pointCount: 10 } },
  { composition: "LiquidBlob", outputName: "blob-galaxy", props: { theme: "galaxyPurple", blobCount: 2, morphSpeed: 1.3, pointCount: 9 } },

  // --- StarfieldWarp ---
  { composition: "StarfieldWarp", outputName: "starfield-galaxy", props: { theme: "galaxyPurple", starCount: 200, warpSpeed: 1 } },
  { composition: "StarfieldWarp", outputName: "starfield-indigo-fast", props: { theme: "midnightIndigo", starCount: 250, warpSpeed: 1.8 } },
  { composition: "StarfieldWarp", outputName: "starfield-mono-slow", props: { theme: "monoMinimal", starCount: 150, warpSpeed: 0.5 } },

  // --- AuroraFlow ---
  { composition: "AuroraFlow", outputName: "aurora-forest", props: { theme: "forestGreen", bandCount: 4, flowSpeed: 1 } },
  { composition: "AuroraFlow", outputName: "aurora-ocean", props: { theme: "oceanBlue", bandCount: 5, flowSpeed: 0.6 } },
  { composition: "AuroraFlow", outputName: "aurora-galaxy", props: { theme: "galaxyPurple", bandCount: 3, flowSpeed: 1.4 } },

  // --- NetworkLines ---
  { composition: "NetworkLines", outputName: "network-indigo", props: { theme: "midnightIndigo", nodeCount: 45, connectDistance: 260, speed: 1 } },
  { composition: "NetworkLines", outputName: "network-neon", props: { theme: "neonCyberpunk", nodeCount: 60, connectDistance: 220, speed: 1.3 } },
  { composition: "NetworkLines", outputName: "network-mono", props: { theme: "monoMinimal", nodeCount: 35, connectDistance: 300, speed: 0.7 } },

  // --- KaleidoscopeLoop ---
  { composition: "KaleidoscopeLoop", outputName: "kaleidoscope-neon", props: { theme: "neonCyberpunk", segments: 8, shapeCount: 10, rotationSpeed: 0.5 } },
  { composition: "KaleidoscopeLoop", outputName: "kaleidoscope-pastel", props: { theme: "pastelDream", segments: 6, shapeCount: 8, rotationSpeed: 0.3 } },
  { composition: "KaleidoscopeLoop", outputName: "kaleidoscope-fire", props: { theme: "fireRed", segments: 12, shapeCount: 12, rotationSpeed: 0.7 } },

  // --- SmokeFog ---
  { composition: "SmokeFog", outputName: "smoke-mono", props: { theme: "monoMinimal", layerCount: 6, driftSpeed: 1 } },
  { composition: "SmokeFog", outputName: "smoke-icewhite", props: { theme: "iceWhite", layerCount: 5, driftSpeed: 0.6 } },
  { composition: "SmokeFog", outputName: "smoke-rosegold", props: { theme: "roseGold", layerCount: 7, driftSpeed: 1.2 } },

  // --- GlitchGrid ---
  { composition: "GlitchGrid", outputName: "glitch-neon", props: { theme: "neonCyberpunk", cols: 16, rows: 9, glitchIntensity: 0.5 } },
  { composition: "GlitchGrid", outputName: "glitch-indigo", props: { theme: "midnightIndigo", cols: 20, rows: 12, glitchIntensity: 0.35 } },
  { composition: "GlitchGrid", outputName: "glitch-fire", props: { theme: "fireRed", cols: 12, rows: 7, glitchIntensity: 0.7 } },

  // --- TitleIntro (untuk promosi EFG Digital, bukan stock loop) ---
  { composition: "TitleIntro", outputName: "title-efgdigital-indigo", props: { theme: "midnightIndigo", title: "EFG DIGITAL", subtitle: "Motion Graphics & Creative Tools" } },
  { composition: "TitleIntro", outputName: "title-efgdigital-gold", props: { theme: "roseGold", title: "EFG DIGITAL", subtitle: "AI-Powered Creative Suite" } },
{ composition: "SmokeFog", outputName: "smokefog-sunsetgold", props: {
  "theme": "sunsetGold",
  "layerCount": 6,
  "driftSpeed": 1
} },];
