import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { Language } from "@/types/certificate";
const Certifications = lazy(() => import("./Certifications"));

export default function RecentAchievements({
  language,
}: {
  language: Language;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const text =
    language === "es"
      ? { title: "Logros recientes", loading: "Cargando logros…" }
      : { title: "Recent achievements", loading: "Loading achievements…" };
  const placeholder = (
    <section className="container mx-auto px-4 py-20 min-h-[560px]">
      <h2 className="section-title text-center">{text.title}</h2>
      <p role="status" className="text-center mt-6">
        {text.loading}
      </p>
    </section>
  );
  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={placeholder}>
          <Certifications language={language} recent />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
