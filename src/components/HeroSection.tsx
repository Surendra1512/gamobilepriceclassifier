import { useEffect, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

const tagline = "Evolving the best features to predict mobile prices with maximum accuracy";

const HeroSection = () => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(tagline.slice(0, i + 1));
      i++;
      if (i >= tagline.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleCanvas />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-mono mb-6 text-primary">
          CSE275 – Optimization in ML
        </span>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4">
          <span className="gradient-text">Optimized Mobile Price</span>
          <br />Classification
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-2">Using Genetic Algorithm Feature Selection</p>
        <p className="font-mono text-sm text-primary/80 h-12 mb-8">
          {typed}<span className="animate-pulse">|</span>
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => scrollTo("problem")} className="glow-btn px-6 py-3 rounded-lg font-heading font-semibold text-sm text-primary-foreground ripple-effect">
            Explore Project
          </button>
          <button onClick={() => scrollTo("predictor")} className="glass px-6 py-3 rounded-lg font-heading font-semibold text-sm text-foreground hover:bg-primary/10 transition-all ripple-effect">
            Try Live Predictor
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
