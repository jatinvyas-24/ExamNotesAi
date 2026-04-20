import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// ✅ Move init inside React lifecycle
const initMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
  });
};

// ✅ Universal Fixer for [Text] → ID[Text]
const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .replace(/```mermaid/g, "")
    .replace(/```/g, "")
    .trim();

  // ✅ Ensure graph exists
  if (!clean.startsWith("graph") && !clean.startsWith("flowchart")) {
    clean = `graph TD\n${clean}`;
  }

  // ✅ Ensure newline after graph TD
  clean = clean.replace(/(graph\s+(TD|LR|RL|BT))(?!\n)/i, "$1\n");

  // ✅ Convert ALL [Text] → ID[Text]
  let idCounter = 1;
  const nodeMap = {};

  clean = clean.replace(/\[(.*?)\]/g, (_, label) => {
    const trimmed = label.trim();

    if (!nodeMap[trimmed]) {
      nodeMap[trimmed] = `N${idCounter++}`;
    }

    return `${nodeMap[trimmed]}[${trimmed}]`;
  });

  return clean.trim();
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    initMermaid();
  }, []);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Date.now()}`;
        const safeChart = cleanMermaidChart(diagram);

        // 🔥 DEBUG
        console.log("FINAL MERMAID:\n", safeChart);

        // ✅ Validate before render
        mermaid.parse(safeChart);

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);

        containerRef.current.innerHTML =
          "<p style='color:red'>Invalid Diagram</p>";
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
      <div className="w-full  bg-white border rounded-lg p-4 overflow-x-auto">
     <div ref={containerRef} className="w-full min-w-full flex justify-center" />
    </div>
  );
}

export default MermaidSetup;