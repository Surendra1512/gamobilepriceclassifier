import { useState, useRef, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler } from "chart.js";
import { useScrollAnimation } from "./useScrollAnimation";
import Modal from "./Modal";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const steps = [
  { icon: "👥", label: "Population", desc: "Generate an initial random population of feature subsets. Each individual (chromosome) represents a binary mask of selected features." },
  { icon: "🏆", label: "Selection", desc: "Select the fittest individuals using tournament selection. Chromosomes with higher classification accuracy are more likely to be chosen." },
  { icon: "🔀", label: "Crossover", desc: "Combine pairs of parent chromosomes using single-point crossover to create offspring that inherit traits from both parents." },
  { icon: "🎲", label: "Mutation", desc: "Randomly flip bits in chromosomes with a small probability to maintain genetic diversity and explore new feature combinations." },
  { icon: "📈", label: "Fitness", desc: "Evaluate each chromosome's fitness by training the classifier on selected features and measuring classification accuracy." },
  { icon: "⭐", label: "Best Features", desc: "After all generations, the chromosome with the highest fitness score represents the optimal feature subset." },
];

const GeneticAlgorithm = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [modal, setModal] = useState<number | null>(null);
  const [generations, setGenerations] = useState<number[]>([]);
  const [fitness, setFitness] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const genRef = useRef(0);
  const pausedRef = useRef(false);

  const runSim = useCallback(() => {
    if (running) return;
    setRunning(true); setPaused(false); pausedRef.current = false;
    setGenerations([]); setFitness([]);
    genRef.current = 0;
    const gens: number[] = []; const fits: number[] = [];

    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      genRef.current++;
      const g = genRef.current;
      gens.push(g);
      const f = 0.55 + 0.38 * (1 - Math.exp(-g * 0.18)) + (Math.random() - 0.5) * 0.02;
      fits.push(Math.min(f, 0.96));
      setGenerations([...gens]); setFitness([...fits]);
      if (g >= 20) { clearInterval(intervalRef.current!); setRunning(false); }
    }, 400);
  }, [running]);

  const pause = () => { setPaused(!paused); pausedRef.current = !pausedRef.current; };
  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setGenerations([]); setFitness([]); setRunning(false); setPaused(false); pausedRef.current = false; genRef.current = 0;
  };

  const chartData = {
    labels: generations.map(g => `Gen ${g}`),
    datasets: [{
      label: "Fitness (Accuracy)",
      data: fitness,
      borderColor: "hsl(199, 89%, 48%)",
      backgroundColor: "hsla(199, 89%, 48%, 0.1)",
      fill: true, tension: 0.4, pointRadius: 3,
      pointBackgroundColor: "hsl(145, 80%, 42%)",
    }],
  };

  return (
    <section id="ga" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">How Genetic Algorithm Works</h2>
        <p className="text-center text-muted-foreground mb-10">Click each step to learn more</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {steps.map((s, i) => (
            <button key={i} onClick={() => setModal(i)}
              className="glass rounded-xl p-4 text-center hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <span className="text-xs font-heading font-semibold">{s.label}</span>
              {i < steps.length - 1 && <span className="hidden lg:inline-block absolute -right-2 top-1/2 text-primary">→</span>}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex gap-3 mb-4 flex-wrap">
            <button onClick={runSim} disabled={running} className="glow-btn px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground disabled:opacity-50 ripple-effect">
              ▶ Run GA Simulation
            </button>
            <button onClick={pause} disabled={!running} className="glass px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button onClick={reset} className="glass px-4 py-2 rounded-lg text-sm font-semibold">🔄 Reset</button>
          </div>
          {generations.length > 0 && (
            <p className="text-sm text-muted-foreground mb-2 font-mono">
              Generation: {generations[generations.length - 1]} / 20 | Best Fitness: {(fitness[fitness.length - 1] * 100).toFixed(1)}%
            </p>
          )}
          <div className="h-64">
            <Line data={chartData} options={{
              responsive: true, maintainAspectRatio: false,
              scales: {
                x: { grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)", font: { size: 10 } } },
                y: { min: 0.5, max: 1, grid: { color: "hsla(222,30%,18%,0.5)" }, ticks: { color: "hsl(215,20%,60%)", callback: (v) => `${(Number(v) * 100).toFixed(0)}%` } },
              },
              plugins: { tooltip: { callbacks: { label: (c) => `Accuracy: ${(c.parsed.y * 100).toFixed(1)}%` } } },
            }} />
          </div>
        </div>
      </div>
      {modal !== null && (
        <Modal open title={steps[modal].label} onClose={() => setModal(null)}><p>{steps[modal].desc}</p></Modal>
      )}
    </section>
  );
};

export default GeneticAlgorithm;
