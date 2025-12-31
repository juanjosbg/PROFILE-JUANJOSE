import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Freelance',
    period: '2022 - Presente',
    description: 'Desarrollo de aplicaciones web con React, Next.js y TypeScript. Implementación de soluciones e-commerce y sitios corporativos.',
    highlights: ['React & Next.js', 'TypeScript', 'E-commerce', 'API Integrations'],
  },
  {
    title: 'WordPress Developer',
    company: 'Proyectos Independientes',
    period: '2021 - 2023',
    description: 'Creación de themes personalizados, optimización SEO y desarrollo de plugins. Migraciones y mejoras de rendimiento.',
    highlights: ['Custom Themes', 'SEO Optimization', 'PHP', 'Performance'],
  },
  {
    title: 'Web Developer',
    company: 'Agencia Digital',
    period: '2020 - 2021',
    description: 'Desarrollo de landing pages, componentes UI y formularios automatizados para campañas de marketing digital.',
    highlights: ['Landing Pages', 'UI Components', 'Marketing', 'Responsive Design'],
  },
];

const strengths = [
  'UI/UX Thinking',
  'SEO Técnico',
  'Performance Web',
  'Migraciones tecnológicas',
  'Trabajo con equipos de marketing',
  'Automatización de procesos',
  'Pensamiento crítico',
  'Solución de problemas',
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            Trayectoria
          </span>
          <h2 className="section-title mb-4">
            Experiencia Profesional
          </h2>
          <p className="section-subtitle mx-auto">
            Mi recorrido como desarrollador y las habilidades que he cultivado
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <div className="relative pl-8">
              {/* Timeline Line */}
              <div className="timeline-line" />

              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title + exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="timeline-dot" />

                    <div className="glass-card p-6 md:p-8 ml-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display font-semibold text-xl">
                          {exp.title}
                        </h3>
                        <span className="text-sm text-primary font-medium">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.period}
                      </p>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="text-xs px-3 py-1 rounded-full bg-muted text-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 md:p-8 sticky top-24">
              <h3 className="font-display font-semibold text-xl mb-6">
                Fortalezas
              </h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((strength, index) => (
                  <motion.span
                    key={strength}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="skill-badge"
                  >
                    {strength}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
