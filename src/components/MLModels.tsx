import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useScrollAnimation } from "./useScrollAnimation";
import Modal from "./Modal";

const models = [
  { name: "Logistic Regression", icon: "📐", acc: 78, accGA: 88, params: "C=1.0, solver='lbfgs', max_iter=1000", pros: "Fast, interpretable, good baseline", cons: "Assumes linear boundaries, limited with complex data" },
  { name: "Random Forest", icon: "🌲", acc: 85, accGA: 93, params: "n_estimators=100, max_depth=10, min_samples_split=5", pros: "Handles non-linearity, robust to overfitting", cons: "Slower training, less interpretable" },
  { name: "SVM", icon: "🎯", acc: 82, accGA: 91, params: "kernel='rbf', C=10, gamma='scale'", pros: "Effective in high dimensions, versatile kernels", cons: "Slow on large datasets, sensitive to scaling" },
];

const MLModels = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [modal, setModal] = useState<number | null>(null);
  const [checked, setChecked] = useState([true, true, true]);
  const [showCompare, setShowCompare] = useState(false);

  const toggle = (i: number) => { const c = [...checked]; c[i] = !c[i]; setChecked(c); };
  const selected = models.filter((_, i) => checked[i]);

  return (
    <section id="models" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">ML Models Comparison</h2>
        <p className="text-center text-muted-foreground mb-10">Compare model performance with and without GA feature selection</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {models.map((m, i) => (
            <div key={i} className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{m.icon}</span>
                <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Accuracy: {m.acc}% → <span className="text-secondary">{m.accGA}%</span> with GA</p>
              <div className="flex gap-2">
                <button onClick={() => setModal(i)} className="glass px-3 py-1.5 rounded-md text-xs font-semibold hover:text-primary transition-colors">View Details</button>
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                  <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="accent-primary" />
                  Compare
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <button onClick={() => setShowCompare(true)} className="glow-btn px-6 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground ripple-effect">
            Compare Selected Models
          </button>
        </div>

        {showCompare && selected.length > 0 && (
          <div className="glass rounded-xl p-6 h-72">
            <Bar
              data={{
                labels: selected.map(m => m.name),
                datasets: [
                  { label: "Without GA", data: selected.map(m => m.acc), backgroundColor: "hsl(0, 84%, 60%)", borderRadius: 6 },
                  { label: "With GA", data: selected.map(m => m.accGA), backgroundColor: "hsl(145, 80%, 42%)", borderRadius: 6 },
                ],
              }}
              options={{
                responsive: true, maintainAspectRatio: false,
                scales: {
                  x: { grid: { display: false }, ticks: { color: "hsl(215,20%,60%)" } },
                  y: { min: 50, max: 100, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)", callback: v => `${v}%` } },
                },
              }}
            />
          </div>
        )}
      </div>
      {modal !== null && (
        <Modal open title={models[modal].name} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <div><span className="text-primary font-semibold text-xs">Hyperparameters:</span><p className="font-mono text-xs mt-1">{models[modal].params}</p></div>
            <div><span className="text-secondary font-semibold text-xs">Pros:</span><p className="text-xs mt-1">{models[modal].pros}</p></div>
            <div><span className="text-destructive font-semibold text-xs">Cons:</span><p className="text-xs mt-1">{models[modal].cons}</p></div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default MLModels;
