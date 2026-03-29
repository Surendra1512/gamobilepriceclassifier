import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

const techs = [
  { name: "Python", desc: "Core programming language for data processing, model training, and GA implementation" },
  { name: "Scikit-learn", desc: "Machine learning library for classification models (LR, RF, SVM) and evaluation metrics" },
  { name: "DEAP", desc: "Distributed Evolutionary Algorithms in Python – used for implementing the Genetic Algorithm" },
  { name: "Pandas", desc: "Data manipulation and analysis, used for loading and preprocessing the mobile dataset" },
  { name: "NumPy", desc: "Numerical computing for array operations, fitness calculations, and matrix transformations" },
  { name: "Matplotlib", desc: "Plotting library for visualizing convergence curves, feature importance, and ROC curves" },
  { name: "Seaborn", desc: "Statistical visualization for confusion matrices, heatmaps, and distribution plots" },
];

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="tech" className="section-padding">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((t, i) => (
            <div key={i} className="relative">
              <button
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                className="glass px-5 py-2.5 rounded-full text-sm font-semibold text-foreground hover:text-primary hover:border-primary/30 transition-all animate-glow-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}>
                {t.name}
              </button>
              {active === i && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass rounded-lg p-3 text-xs text-muted-foreground w-56 z-20 text-center">
                  {t.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
