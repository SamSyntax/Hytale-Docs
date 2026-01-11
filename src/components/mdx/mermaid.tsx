"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with Hytale theme
mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    // Background colors
    background: "#1e2b3d",
    primaryColor: "#253649",
    secondaryColor: "#1a2332",
    tertiaryColor: "#2d3f54",

    // Border colors
    primaryBorderColor: "#e8a849",
    secondaryBorderColor: "#4a90a8",
    tertiaryBorderColor: "#3d5168",

    // Text colors
    primaryTextColor: "#e2e8f0",
    secondaryTextColor: "#94a3b8",
    tertiaryTextColor: "#64748b",

    // Line colors
    lineColor: "#4a90a8",

    // Node colors
    nodeBorder: "#e8a849",
    nodeTextColor: "#e2e8f0",

    // Flowchart specific
    mainBkg: "#253649",
    nodeBkg: "#253649",
    clusterBkg: "#1e2b3d",
    clusterBorder: "#3d5168",

    // Label colors
    labelBackground: "#1a2332",
    labelTextColor: "#e2e8f0",

    // Arrow
    arrowheadColor: "#e8a849",

    // Font
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    fontSize: "14px",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
    nodeSpacing: 50,
    rankSpacing: 50,
    htmlLabels: true,
  },
  sequence: {
    actorMargin: 50,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
  },
});

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        // Generate unique ID for this chart
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the chart
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border-2 border-red-500/50 bg-red-500/10 p-4 text-red-400">
        <p className="text-sm font-medium">Diagram Error</p>
        <pre className="mt-2 text-xs opacity-75">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center">
      <div
        ref={containerRef}
        className="mermaid-container rounded-xl border-2 border-border bg-card p-6 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
