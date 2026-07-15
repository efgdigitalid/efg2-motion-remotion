import React, { useMemo, useState } from "react";
import { Player } from "@remotion/player";
import { REGISTRY, THEME_NAMES } from "./registry";

const selectStyle: React.CSSProperties = {
  background: "#1a1a22",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 14,
};

export const App: React.FC = () => {
  const [compIndex, setCompIndex] = useState(0);
  const [theme, setTheme] = useState<string>(THEME_NAMES[0]);
  const [copied, setCopied] = useState(false);

  const comp = REGISTRY[compIndex];

  const mergedProps = useMemo(
    () => ({ ...comp.defaultProps, theme }),
    [comp, theme]
  );

  const renderJobSnippet = useMemo(() => {
    const outputName = `${comp.id.toLowerCase()}-${theme.toLowerCase()}`;
    return `{ composition: "${comp.id}", outputName: "${outputName}", props: ${JSON.stringify(
      mergedProps,
      null,
      2
    )} },`;
  }, [comp, theme, mergedProps]);

  const copySnippet = () => {
    navigator.clipboard.writeText(renderJobSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#fff",
        minHeight: "100vh",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>EFG Motion — Live Preview</h1>
      <p style={{ color: "#999", fontSize: 13, marginTop: 0, marginBottom: 20 }}>
        Preview di browser saja (tidak menghasilkan file). Untuk render MP4 final, jalankan
        GitHub Actions "Render Motion Graphics" di repo.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <label>
          Komposisi:{" "}
          <select
            style={selectStyle}
            value={compIndex}
            onChange={(e) => setCompIndex(Number(e.target.value))}
          >
            {REGISTRY.map((c, i) => (
              <option key={c.id} value={i}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tema warna:{" "}
          <select style={selectStyle} value={theme} onChange={(e) => setTheme(e.target.value)}>
            {THEME_NAMES.map((th) => (
              <option key={th} value={th}>
                {th}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          aspectRatio: `${comp.width} / ${comp.height}`,
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #333",
        }}
      >
        <Player
          key={`${comp.id}-${theme}`} // reset player tiap ganti komposisi/tema
          component={comp.component}
          inputProps={mergedProps}
          durationInFrames={comp.durationInFrames}
          compositionWidth={comp.width}
          compositionHeight={comp.height}
          fps={30}
          style={{ width: "100%", height: "100%" }}
          controls
          loop
          autoPlay
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 13, color: "#999", marginBottom: 6 }}>
          Cocok dengan kombinasi ini? Salin baris di bawah lalu tempel ke{" "}
          <code>scripts/render-jobs.mjs</code> untuk masuk antrian render batch:
        </p>
        <pre
          style={{
            background: "#111",
            padding: 12,
            borderRadius: 8,
            fontSize: 12,
            overflowX: "auto",
            border: "1px solid #333",
          }}
        >
          {renderJobSnippet}
        </pre>
        <button
          onClick={copySnippet}
          style={{
            background: "#4361ee",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {copied ? "Tersalin!" : "Salin ke clipboard"}
        </button>
      </div>
    </div>
  );
};
