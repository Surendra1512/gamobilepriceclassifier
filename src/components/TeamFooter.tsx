import { useScrollAnimation } from "./useScrollAnimation";

const members = [
  { name: "KOTA SURENDRA REDDY", phone: "+918978896625" },
  { name: "HARSHA BACHAM", phone: "+917793914091" },
];

const TeamFooter = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="team" className="section-padding">
      <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">Project By</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {members.map((m, i) => (
            <div key={i} className="glass rounded-xl p-8 text-center">
              <h3 className="font-heading font-bold text-foreground text-xl mb-4">{m.name}</h3>
              <a href={`tel:${m.phone}`} className="glow-btn inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground ripple-effect">
                📞 {m.phone}
              </a>
            </div>
          ))}
        </div>

        <footer className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">CSE275 – Optimization in Machine Learning | B.Tech Computer Science</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Lovely Professional University • 2025</p>
        </footer>
      </div>
    </section>
  );
};

export default TeamFooter;
