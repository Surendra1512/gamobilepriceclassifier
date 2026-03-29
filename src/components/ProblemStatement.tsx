import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import Modal from "./Modal";

const problems = [
  { icon: "📊", title: "Too Many Features", desc: "Irrelevant features reduce model accuracy and introduce noise, making it harder for classifiers to learn meaningful patterns from mobile phone data." },
  { icon: "🧬", title: "No Feature Optimization", desc: "Basic models use all available features without determining which are truly important. This leads to suboptimal classification performance and missed patterns." },
  { icon: "📉", title: "Overfitting Risk", desc: "Including too many features causes models to memorize training data rather than learning generalizable patterns, resulting in poor performance on unseen data." },
  { icon: "⚡", title: "Slow Training", desc: "Unnecessary features significantly increase computation time and memory usage during model training, making the optimization pipeline inefficient." },
];

const ProblemStatement = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section id="problem" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Problem Statement</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Key challenges in mobile price classification that our GA-based approach addresses</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <button key={i} onClick={() => setModal(i)}
              className="glass rounded-xl p-6 text-left hover:border-primary/30 transition-all hover:-translate-y-1 group cursor-pointer">
              <span className="text-3xl mb-3 block">{p.icon}</span>
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>
      {modal !== null && (
        <Modal open title={problems[modal].title} onClose={() => setModal(null)}>
          <p>{problems[modal].desc}</p>
        </Modal>
      )}
    </section>
  );
};

export default ProblemStatement;
