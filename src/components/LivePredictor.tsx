import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

const storageOptions = ["16", "32", "64", "128", "256"];

const predict = (ram: number, battery: number, screen: number, camera: number, proc: number, storage: number, fourG: boolean, bt: boolean) => {
  let score = 0;
  score += (ram / 16384) * 30;
  score += (battery / 6000) * 10;
  score += (screen / 7.5) * 5;
  score += (camera / 108) * 15;
  score += (proc / 3.5) * 20;
  score += (storage / 256) * 10;
  if (fourG) score += 5;
  if (bt) score += 5;

  const low = Math.max(0, 40 - score * 1.5);
  const med = Math.max(0, score < 40 ? 35 : 45 - Math.abs(score - 45));
  const high = Math.max(0, score > 30 ? score * 0.6 - 10 : 0);
  const prem = Math.max(0, score > 50 ? score - 40 : 0);
  const total = low + med + high + prem;

  return {
    confidences: [low / total * 100, med / total * 100, high / total * 100, prem / total * 100],
    factors: [
      { name: "RAM", impact: (ram / 16384) * 100 },
      { name: "Processor", impact: (proc / 3.5) * 100 },
      { name: "Camera", impact: (camera / 108) * 100 },
      { name: "Battery", impact: (battery / 6000) * 100 },
      { name: "Storage", impact: (storage / 256) * 100 },
    ].sort((a, b) => b.impact - a.impact),
  };
};

const classes = [
  { label: "LOW COST", range: "₹5,000 – ₹10,000", color: "hsl(145, 80%, 42%)", emoji: "🟢" },
  { label: "MEDIUM", range: "₹10,000 – ₹20,000", color: "hsl(199, 89%, 48%)", emoji: "🔵" },
  { label: "HIGH END", range: "₹20,000 – ₹40,000", color: "hsl(30, 90%, 55%)", emoji: "🟠" },
  { label: "PREMIUM", range: "₹40,000+", color: "hsl(0, 84%, 60%)", emoji: "🔴" },
];

const LivePredictor = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [ram, setRam] = useState(4096);
  const [battery, setBattery] = useState(3000);
  const [screen, setScreen] = useState(5.5);
  const [camera, setCamera] = useState(24);
  const [proc, setProc] = useState(2.0);
  const [storage, setStorage] = useState(64);
  const [fourG, setFourG] = useState(true);
  const [bt, setBt] = useState(true);
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true); setResult(null);
    setTimeout(() => { setResult(predict(ram, battery, screen, camera, proc, storage, fourG, bt)); setLoading(false); }, 1200);
  };

  const handleReset = () => {
    setRam(4096); setBattery(3000); setScreen(5.5); setCamera(24); setProc(2.0); setStorage(64); setFourG(true); setBt(true); setResult(null);
  };

  const bestIdx = result ? result.confidences.indexOf(Math.max(...result.confidences)) : -1;

  return (
    <section id="predictor" className="section-padding">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">🔴 Live Mobile Price Predictor</h2>
        <p className="text-center text-muted-foreground mb-10">Adjust features and predict the price range</p>

        <div className="glass rounded-xl p-6 mb-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground">RAM: <span className="text-primary font-mono">{ram >= 1024 ? `${(ram / 1024).toFixed(1)}GB` : `${ram}MB`}</span></label>
              <input type="range" min={256} max={16384} step={256} value={ram} onChange={e => setRam(+e.target.value)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Battery: <span className="text-primary font-mono">{battery} mAh</span></label>
              <input type="range" min={500} max={6000} step={100} value={battery} onChange={e => setBattery(+e.target.value)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Screen: <span className="text-primary font-mono">{screen.toFixed(1)}"</span></label>
              <input type="range" min={40} max={75} value={screen * 10} onChange={e => setScreen(+e.target.value / 10)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Camera: <span className="text-primary font-mono">{camera} MP</span></label>
              <input type="range" min={2} max={108} value={camera} onChange={e => setCamera(+e.target.value)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Processor: <span className="text-primary font-mono">{proc.toFixed(1)} GHz</span></label>
              <input type="range" min={5} max={35} value={proc * 10} onChange={e => setProc(+e.target.value / 10)} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Internal Storage</label>
              <select value={storage} onChange={e => setStorage(+e.target.value)} className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground">
                {storageOptions.map(s => <option key={s} value={s}>{s}GB</option>)}
              </select>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                4G <button onClick={() => setFourG(!fourG)} className={`w-10 h-5 rounded-full transition-colors ${fourG ? "bg-primary" : "bg-muted"} relative`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${fourG ? "left-5" : "left-0.5"}`} />
                </button>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                Bluetooth <button onClick={() => setBt(!bt)} className={`w-10 h-5 rounded-full transition-colors ${bt ? "bg-primary" : "bg-muted"} relative`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${bt ? "left-5" : "left-0.5"}`} />
                </button>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          <button onClick={handlePredict} disabled={loading} className="glow-btn px-8 py-3 rounded-lg font-heading font-bold text-sm text-primary-foreground ripple-effect animate-glow-pulse disabled:opacity-50">
            {loading ? "⏳ Analyzing..." : "🔮 Predict Price Range"}
          </button>
          <button onClick={handleReset} className="glass px-6 py-3 rounded-lg font-heading font-semibold text-sm ripple-effect">🔄 Reset</button>
        </div>

        {loading && (
          <div className="flex justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
        )}

        {result && (
          <div className="glass rounded-xl p-6 space-y-6">
            <div className="text-center">
              <span className="text-3xl">{classes[bestIdx].emoji}</span>
              <h3 className="font-heading text-2xl font-bold mt-2" style={{ color: classes[bestIdx].color }}>{classes[bestIdx].label}</h3>
              <p className="text-muted-foreground text-sm">{classes[bestIdx].range}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Confidence Scores</p>
              {classes.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs w-20 text-muted-foreground">{c.label}</span>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${result.confidences[i]}%`, backgroundColor: c.color }} />
                  </div>
                  <span className="text-xs font-mono text-foreground w-12 text-right">{result.confidences[i].toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Top Contributing Features</p>
              {result.factors.slice(0, 4).map((f, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <span className="text-primary text-xs">▸</span>
                  <span className="text-sm text-foreground">{f.name}</span>
                  <span className="text-xs font-mono text-muted-foreground ml-auto">{f.impact.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LivePredictor;
