import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "ga", label: "GA Process" },
  { id: "optimization", label: "Optimization" },
  { id: "dataset", label: "Dataset" },
  { id: "predictor", label: "Predictor" },
  { id: "results", label: "Results" },
  { id: "team", label: "Team" },
];

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.offsetTop - 100 : 0 };
      });
      const current = offsets.filter(o => window.scrollY >= o.top).pop();
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="font-heading font-bold text-lg gradient-text cursor-pointer" onClick={() => scrollTo("hero")}>GA-MPC</span>
        <button className="md:hidden text-foreground text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
        <div className="hidden md:flex gap-1">
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${active === s.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden glass border-t border-border px-4 pb-4">
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm ${active === s.id ? "text-primary bg-primary/10" : "text-muted-foreground"}`}>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
