import { useScrollAnimation } from "./useScrollAnimation";
import { useEffect, useState } from "react";

const counters = [
  { label: "Accuracy (with GA)", value: 93.2, suffix: "%" },
  { label: "Accuracy (without GA)", value: 78.5, suffix: "%" },
  { label: "Features Selected", value: 5, suffix: " of 8" },
  { label: "Generations to Converge", value: 18, suffix: "" },
];

const AnimatedCounter = ({ target, suffix, active }: { target: number; suffix: string; active: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(start);
    }, 30);
    return () => clearInterval(interval);
  }, [active, target]);

  return <span className="font-heading text-4xl md:text-5xl font-extrabold gradient-text">{Number.isInteger(target) ? Math.round(count) : count.toFixed(1)}{suffix}</span>;
};

const ResultsOutcomes = () => {
  const { ref, isVisible } = useScrollAnimation();

  const downloadReport = () => {
    const text = `PROJECT REPORT
================
Optimized Mobile Price Classification using Genetic Algorithm Feature Selection
CSE275 – Optimization in Machine Learning (B.Tech)

OBJECTIVE:
Use Genetic Algorithm (GA) to select optimal features for mobile phone price classification.

METHODOLOGY:
- Dataset: Mobile phone specifications (RAM, Battery, Screen Size, Camera MP, Processor Speed, Internal Storage, 4G, Bluetooth)
- GA Parameters: Population=50, Generations=20, Mutation Rate=0.1, Crossover Rate=0.8
- Models: Logistic Regression, Random Forest, SVM

KEY RESULTS:
- Accuracy improved from 78.5% to 93.2% with GA feature selection
- Features selected: 5 out of 8 (RAM, Battery, Camera MP, Processor Speed, Bluetooth)
- Convergence achieved at generation 18
- Best model: Random Forest with 93.2% accuracy

CONCLUSION:
GA-based feature selection significantly improves classification accuracy while reducing model complexity.
`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GA_Mobile_Price_Classification_Report.txt";
    a.click();
  };

  return (
    <section id="results" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">Key Outcomes</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {counters.map((c, i) => (
            <div key={i} className="glass rounded-xl p-6 text-center">
              <AnimatedCounter target={c.value} suffix={c.suffix} active={isVisible} />
              <p className="text-xs text-muted-foreground mt-2">{c.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button onClick={downloadReport} className="glow-btn px-8 py-3 rounded-lg font-heading font-bold text-sm text-primary-foreground ripple-effect">
            📄 Download Project Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsOutcomes;
