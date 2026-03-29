import { useScrollAnimation } from "./useScrollAnimation";

const members = [
  { initials: "AK", name: "Arjun Kumar", role: "GA Implementation" },
  { initials: "PS", name: "Priya Sharma", role: "ML Models & Evaluation" },
  { initials: "RV", name: "Rahul Verma", role: "Data Preprocessing" },
  { initials: "NM", name: "Neha Mishra", role: "Visualization & Report" },
];

const TeamFooter = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="team" className="section-padding">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">Our Team</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {members.map((m, i) => (
            <div key={i} className="glass rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-3">
                <span className="font-heading font-bold text-primary-foreground text-lg">{m.initials}</span>
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm">{m.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-12">
          <a href="mailto:team@university.edu" className="glow-btn inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground ripple-effect">
            ✉ Contact Team
          </a>
        </div>

        <footer className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">CSE275 – Optimization in Machine Learning | B.Tech Computer Science</p>
          <p className="text-xs text-muted-foreground/60 mt-1">University of Technology • 2025</p>
        </footer>
      </div>
    </section>
  );
};

export default TeamFooter;
