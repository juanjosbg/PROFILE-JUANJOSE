import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Code2,
  Workflow,
  Server,
  Sparkles,
  BarChart3,
  Wrench,
} from "lucide-react";
import { getSkillCategories } from "@/data/skills";
import SkillChip from "./SkillChip";
import type { Language } from "@/types/certificate";
import type { SkillCategoryId } from "@/types/skills";

const categoryIcons = {
  frontend: Code2,
  automation: Workflow,
  backend: Server,
  ai: Sparkles,
  marketing: BarChart3,
  tools: Wrench,
} satisfies Record<SkillCategoryId, typeof Code2>;

export default function Skills({ language }: { language: Language }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const categories = getSkillCategories(language);
  const text =
    language === "es"
      ? {
          label: "Habilidades",
          title: "Tech Stack",
          subtitle: "React, automatización con n8n e IA como siguiente paso",
          learning: "En aprendizaje",
        }
      : {
          label: "Skills",
          title: "Tech Stack",
          subtitle: "React, n8n automation, and AI as my next step",
          learning: "Learning",
        };

  return (
    <section
      id="skills"
      className="py-20 md:py-24 bg-muted/30"
      ref={ref}
      aria-labelledby="skills-title"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            {text.label}
          </span>
          <h2 id="skills-title" className="section-title mb-4">
            {text.title}
          </h2>
          <p className="section-subtitle mx-auto !text-foreground/70">{text.subtitle}</p>
        </motion.div>
        <div
          data-skills-grid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-5 lg:gap-6"
        >
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.id];
            return (
              <motion.article
                key={category.id}
                data-skill-category={category.id}
                aria-labelledby={`skill-title-${category.id}`}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                  delay: reducedMotion ? 0 : index * 0.07,
                }}
                className={`rounded-2xl border bg-card ${category.primary ? "border-primary/30 p-6" : "border-border p-5"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center ${category.primary ? "w-12 h-12" : "w-10 h-10"}`}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex flex-wrap items-center gap-2">
                    <h3
                      id={`skill-title-${category.id}`}
                      className="font-display font-semibold text-lg"
                    >
                      {category.title}
                    </h3>
                    {category.learning && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
                        />
                        {text.learning}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                  {category.description}
                </p>
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label={category.title}
                >
                  {category.skills.map((skill) => (
                    <SkillChip
                      key={skill.name}
                      skill={skill}
                      language={language}
                      primary={category.primary}
                    />
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
