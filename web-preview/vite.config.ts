import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PENTING: ganti "REPO_NAME" di bawah dengan nama repo GitHub kamu persis
// (contoh: kalau repo-nya "efg-motion-remotion", maka base jadi "/efg-motion-remotion/")
// Ini wajib supaya asset (JS/CSS) ke-load dengan benar di GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: "/efg2-motion-remotion/",
  server: {
    fs: {
      allow: [".."], // izinkan import dari ../src (folder komposisi Remotion utama)
    },
  },
  build: {
    outDir: "dist",
  },
});
