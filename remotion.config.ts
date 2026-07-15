import { Config } from "@remotion/cli/config";

// ==== Kualitas render tinggi untuk stock footage ====
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(16); // makin kecil makin tinggi kualitas (visually lossless ~16-18)
Config.setPixelFormat("yuv420p");
Config.setConcurrency(2); // aman untuk device dengan RAM terbatas, naikkan kalau render di cloud/CI

// Chromium settings - matikan headless GPU issue di beberapa environment CI
Config.setChromiumOpenGlRenderer("angle");
