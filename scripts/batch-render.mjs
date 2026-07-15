import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { RENDER_JOBS } from "./render-jobs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, "..", "src", "index.ts");
const outDir = path.join(__dirname, "..", "out");

async function main() {
  console.log("Bundling project...");
  const bundleLocation = await bundle({
    entryPoint: entry,
    onProgress: (p) => process.stdout.write(`\rBundling: ${p}%   `),
  });
  console.log("\nBundle selesai.\n");

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const job of RENDER_JOBS) {
    console.log(`\n=== Rendering: ${job.outputName} (${job.composition}) ===`);

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: job.composition,
      inputProps: job.props,
    });

    const outputLocation = path.join(outDir, `${job.outputName}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: job.props,
      crf: 16,
      onProgress: ({ progress }) => {
        process.stdout.write(`\r  Progress: ${Math.round(progress * 100)}%   `);
      },
    });

    console.log(`\n  Selesai -> ${outputLocation}`);
  }

  console.log("\nSemua render selesai. Cek folder /out untuk file MP4.");
}

main().catch((err) => {
  console.error("Render gagal:", err);
  process.exit(1);
});
