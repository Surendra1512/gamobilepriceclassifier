import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { useScrollAnimation } from "./useScrollAnimation";

const metricsBeforeGA = { accuracy: 78.5, precision: 76.2, recall: 77.8, f1: 77.0 };
const metricsAfterGA = { accuracy: 93.2, precision: 91.8, recall: 92.5, f1: 92.1 };

const cmBefore = [[38, 5, 4, 3], [6, 35, 5, 4], [3, 6, 36, 5], [4, 3, 6, 37]];
const cmAfter = [[47, 2, 1, 0], [1, 45, 3, 1], [0, 2, 46, 2], [1, 0, 1, 48]];

const cmLabels = [
  ["True Positive (Low→Low)", "FP: Low predicted, Medium actual", "FP: Low predicted, High actual", "FP: Low predicted, Premium actual"],
  ["FP: Medium predicted, Low actual", "True Positive (Medium→Medium)", "FP: Medium predicted, High actual", "FP: Medium predicted, Premium actual"],
  ["FP: High predicted, Low actual", "FP: High predicted, Medium actual", "True Positive (High→High)", "FP: High predicted, Premium actual"],
  ["FP: Premium predicted, Low actual", "FP: Premium predicted, Medium actual", "FP: Premium predicted, High actual", "True Positive (Premium→Premium)"],
];

const EvaluationMetrics = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [afterGA, setAfterGA] = useState(true);
  const [tooltip, setTooltip] = useState("");
  const metrics = afterGA ? metricsAfterGA : metricsBeforeGA;
  const cm = afterGA ? cmAfter : cmBefore;

  const rocData = {
    labels: Array.from({ length: 11 }, (_, i) => (i / 10).toFixed(1)),
    datasets: [
      {
        label: afterGA ? "After GA (AUC=0.97)" : "Before GA (AUC=0.82)",
        data: afterGA
          ? [0, 0.4, 0.65, 0.78, 0.86, 0.91, 0.94, 0.96, 0.98, 0.99, 1]
          : [0, 0.2, 0.38, 0.52, 0.63, 0.72, 0.79, 0.85, 0.9, 0.95, 1],
        borderColor: afterGA ? "hsl(145,80%,42%)" : "hsl(0,84%,60%)",
        backgroundColor: afterGA ? "hsla(145,80%,42%,0.1)" : "hsla(0,84%,60%,0.1)",
        fill: true, tension: 0.4,
      },
      {
        label: "Random", data: Array.from({ length: 11 }, (_, i) => i / 10),
        borderColor: "hsl(215,20%,40%)", borderDash: [5, 5], pointRadius: 0,
      },
    ],
  };

  return (
    <section id="metrics" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Evaluation Metrics</h2>

        <div className="flex justify-center gap-2 mb-10">
          <button onClick={() => setAfterGA(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!afterGA ? "glow-btn text-primary-foreground" : "glass text-muted-foreground"}`}>Before GA</button>
          <button onClick={() => setAfterGA(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${afterGA ? "glow-btn text-primary-foreground" : "glass text-muted-foreground"}`}>After GA</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h3 className="font-heading font-semibold text-sm mb-4 text-foreground">Confusion Matrix <span className="text-xs text-muted-foreground">(click cells)</span></h3>
            <div className="grid grid-cols-4 gap-1">
              {cm.map((row, i) => row.map((val, j) => (
                <button key={`${i}-${j}`}
                  onMouseEnter={() => setTooltip(cmLabels[i][j])}
                  onMouseLeave={() => setTooltip("")}
                  className={`aspect-square rounded-md flex items-center justify-center font-mono text-sm font-bold transition-all hover:scale-105 ${i === j ? "bg-primary/30 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {val}
                </button>
              )))}
            </div>
            {tooltip && <p className="text-xs text-muted-foreground mt-3 text-center">{tooltip}</p>}
          </div>

          <div className="glass rounded-xl p-6 space-y-4">
            <h3 className="font-heading font-semibold text-sm text-foreground mb-2">Performance Metrics</h3>
            {Object.entries(metrics).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground capitalize">{key.replace("f1", "F1-Score")}</span>
                  <span className="font-mono text-foreground">{val}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-primary to-secondary" style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 h-72">
          <h3 className="font-heading font-semibold text-sm text-foreground mb-4">ROC Curve</h3>
          <div className="h-52">
            <Line data={rocData} options={{
              responsive: true, maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: "FPR", color: "hsl(215,20%,60%)" }, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)" } },
                y: { title: { display: true, text: "TPR", color: "hsl(215,20%,60%)" }, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)" } },
              },
            }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationMetrics;
