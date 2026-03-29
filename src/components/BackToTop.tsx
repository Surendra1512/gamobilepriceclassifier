import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 glow-btn text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-xl transition-all ripple-effect">
      ↑
    </button>
  );
};

export default BackToTop;
