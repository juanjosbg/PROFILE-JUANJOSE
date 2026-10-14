import { getSkillCategories } from '@/data/skills';
import type { SkillItem } from '@/types/skills';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

type Language = 'es' | 'en';

interface SkillsProps {
  language: Language;
}

const Skills = ({ language }: SkillsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const levelLabel: Record<Language, Record<SkillItem['level'], string>> = {
    es: { intermediate: 'Intermedio', advanced: 'Avanzado' },
    en: { intermediate: 'Intermediate', advanced: 'Advanced' },
  };

  const categories = getSkillCategories(language);

  const text =
    language === 'es'
      ? {
        label: 'Habilidades',
        title: 'Tech Stack',
        subtitle: 'Herramientas para construir productos web con React e IA',
      }
      : {
        label: 'Skills',
        title: 'Tech Stack',
        subtitle: 'Tools for building web products with React and AI',
      };

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    updateCurrent();
    api.on('select', updateCurrent);

    return () => {
      api.off('select', updateCurrent);
    };
  }, [api]);

return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            {text.label}
          </span>
          <h2 className="section-title mb-2">{text.title}</h2>
          <p className="section-subtitle mx-auto">{text.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl mx-auto px-12 md:px-16"
        >
          <Carousel setApi={setApi} opts={{ align: 'start', loop: true }}>
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem key={category.title} className="md:basis-1/2">
                  <article className="glass-card p-6 md:p-8 min-h-[420px]">
                    <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {category.title}
                    </h3>
                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="flex items-center justify-between group">
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
                            {levelLabel[language][skill.level]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 md:-left-12 bg-card border-border hover:bg-muted" />
            <CarouselNext className="-right-10 md:-right-12 bg-card border-border hover:bg-muted" />
          </Carousel>

          <div className="flex items-center justify-center gap-2 mt-6">
            {categories.map((category, index) => (
              <button
                key={`${category.title}-dot`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all ${current === index ? 'w-8 bg-primary' : 'w-2.5 bg-muted'
                  }`}
                aria-label={`${language === 'es' ? 'Ir a' : 'Go to'} ${category.title}`}
                aria-pressed={current === index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
