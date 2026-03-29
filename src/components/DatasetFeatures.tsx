import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend } from "chart.js";
import { useScrollAnimation } from "./useScrollAnimation";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTooltip, Legend);

const features = ["RAM", "Battery", "Screen Size", "Camera MP", "Proc Speed", "Int Storage", "4G Support", "Bluetooth"];
const selected = [true, true, false, true, true, false, false, true]; // GA selected
const importance = [0.95, 0.82, 0.35, 0.78, 0.88, 0.42, 0.28, 0.65];

const mockData = [
  [4096, 4500, 5.5, 48, 2.5, 64, "Yes", "Yes"],
  [2048, 3000, 6.0, 12, 1.8, 32, "No", "Yes"],
  [8192, 5000, 6.7, 108, 3.2, 128, "Yes", "Yes"],
  [1024, 2500, 5.0, 8, 1.2, 16, "No", "No"],
  [6144, 4800, 6.5, 64, 2.8, 256, "Yes", "Yes"],
];

const DatasetFeatures = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showChart, setShowChart] = useState(false);

  return (
    <section id="dataset" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Dataset & Features</h2>
        <p className="text-center text-muted-foreground mb-10">Mobile phone dataset with 8 key features</p>

        <div className="glass rounded-xl overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {features.map((f, i) => (
                  <th key={i} className={`px-4 py-3 font-heading font-semibold text-xs whitespace-nowrap ${selected[i] ? "text-secondary" : "text-destructive"}`}>
                    {selected[i] ? "✓ " : "✗ "}{f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2.5 font-mono text-xs ${selected[j] ? "text-foreground" : "text-muted-foreground/50"}`}>{String(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mb-6">
          <button onClick={() => setShowChart(!showChart)} className="glow-btn px-6 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground ripple-effect">
            {showChart ? "Hide" : "Show"} Feature Importance
          </button>
        </div>

        {showChart && (
          <div className="glass rounded-xl p-6 h-72">
            <Bar
              data={{
                labels: features,
                datasets: [{
                  label: "Importance Score",
                  data: importance,
                  backgroundColor: selected.map(s => s ? "hsl(145, 80%, 42%)" : "hsl(0, 84%, 60%)"),
                  borderRadius: 6,
                }],
              }}
              options={{
                indexAxis: "y", responsive: true, maintainAspectRatio: false,
                scales: {
                  x: { max: 1, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)" } },
                  y: { grid: { display: false }, ticks: { color: "hsl(215,20%,60%)", font: { size: 11 } } },
                },
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DatasetFeatures;
