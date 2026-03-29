import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useScrollAnimation } from "./useScrollAnimation";

const OptimizationCore = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [tab, setTab] = useState(0);
  const [popSize, setPopSize] = useState(50);
  const [gens, setGens] = useState(20);
  const [mutRate, setMutRate] = useState(0.1);
  const [crossRate, setCrossRate] = useState(0.8);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typeset?.();
    }
  }, [tab]);

  const convData = {
    labels: Array.from({ length: 20 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Fitness", data: Array.from({ length: 20 }, (_, i) => 0.55 + 0.38 * (1 - Math.exp(-i * 0.2))),
        borderColor: "hsl(199,89%,48%)", backgroundColor: "hsla(199,89%,48%,0.1)", fill: true, tension: 0.4,
      },
      {
        label: "Loss", data: Array.from({ length: 20 }, (_, i) => 1.2 * Math.exp(-i * 0.15) + 0.1),
        borderColor: "hsl(145,80%,42%)", backgroundColor: "hsla(145,80%,42%,0.1)", fill: true, tension: 0.4,
      },
    ],
  };

  return (
    <section id="optimization" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Optimization Core</h2>

        <div className="glass rounded-xl p-6 mb-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">GA Objective Function</p>
          <div className="font-mono text-lg md:text-xl text-foreground" dangerouslySetInnerHTML={{
            __html: `\\[\\max\\left(\\text{Accuracy} - \\lambda \\times \\text{Feature Count}\\right)\\]`
          }} />
          <p className="text-sm text-muted-foreground mt-4 mb-2">Cross-Entropy Loss</p>
          <div className="font-mono text-base text-foreground" dangerouslySetInnerHTML={{
            __html: `\\[L = -\\sum_{i=1}^{C} y_i \\log(\\hat{y}_i)\\]`
          }} />
        </div>

        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {["GA Parameters", "Fitness Function", "Convergence"].map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === i ? "glow-btn text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          {tab === 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Population Size: <span className="text-primary font-mono">{popSize}</span></label>
                <input type="range" min={10} max={200} value={popSize} onChange={e => setPopSize(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Generations: <span className="text-primary font-mono">{gens}</span></label>
                <input type="range" min={5} max={100} value={gens} onChange={e => setGens(+e.target.value)} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Mutation Rate: <span className="text-primary font-mono">{mutRate.toFixed(2)}</span></label>
                <input type="range" min={0} max={50} value={mutRate * 100} onChange={e => setMutRate(+e.target.value / 100)} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Crossover Rate: <span className="text-primary font-mono">{crossRate.toFixed(2)}</span></label>
                <input type="range" min={50} max={100} value={crossRate * 100} onChange={e => setCrossRate(+e.target.value / 100)} className="w-full accent-primary" />
              </div>
            </div>
          )}
          {tab === 1 && (
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>The fitness function balances classification accuracy against model complexity:</p>
              <div className="glass rounded-lg p-4 font-mono text-xs">
                fitness(chromosome) = accuracy(selected_features) - λ × (n_selected / n_total)
              </div>
              <p>Where <span className="text-primary">λ = 0.01</span> penalizes chromosomes with too many features, encouraging the GA to find minimal feature subsets that still achieve high accuracy.</p>
              <p>This ensures the selected features are both <span className="text-secondary">informative</span> and <span className="text-secondary">compact</span>.</p>
            </div>
          )}
          {tab === 2 && (
            <div className="h-64">
              <Line data={convData} options={{
                responsive: true, maintainAspectRatio: false,
                scales: {
                  x: { title: { display: true, text: "Generation", color: "hsl(215,20%,60%)" }, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)" } },
                  y: { grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)" } },
                },
              }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OptimizationCore;
