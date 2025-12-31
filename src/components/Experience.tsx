import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CalendarCheck, BookOpen, Plane } from 'lucide-react';

const experiences = [
  {
    title: 'Desarrollador Frontend',
    company: 'GP3Digital, Cali (Freelance/Contrato por proyecto)',
    period: 'Abr. 2025 - Actualidad',
    description: 'Como freelance participo en proyectos de migración, optimización y creación de soluciones digitales. Migré e implementé blogs en WordPress, diseñé y desarrollé aplicaciones y sitios con React.js, Next.js y TypeScript, optimicé interfaces con foco en accesibilidad y UX, e integré CMS y servicios externos (Firebase, APIs) para asegurar seguridad y escalabilidad.',
    highlights: ['React.js', 'Next.js', 'TypeScript', 'WordPress', 'Firebase', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'APIs'],
  },
  {
    title: 'Desarrollador Frontend',
    company: 'Preztel SAS, Cali',
    period: 'Feb. 2025 - Jul. 2025',
    description: 'Participé en el desarrollo de soluciones para el sector fintech y la optimización de plataformas corporativas. Construí una app móvil para envíos de dinero, gestioné sitios en WordPress con funcionalidades personalizadas y mejoras de rendimiento, y trabajé con metodologías ágiles y control de versiones.',
    highlights: ['React Native', 'WordPress', 'PHP', 'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Firebase', 'Git/GitHub'],
  },
  {
    title: 'Diseñador y Desarrollador Web',
    company: 'Magica Escultura, Cali',
    period: 'Ago. 2024 - Feb. 2025',
    description: 'Actualicé y optimicé la plataforma e-commerce de una clínica de cirugía estética, enfocándome en UX, rendimiento y visibilidad digital. Personalicé WordPress, optimicé SEO técnico y contenidos, gestioné campañas SEM, configuré analítica (GA4, GTM, GSC) e implementé automatizaciones, pagos y mejoras en el carrito.',
    highlights: ['WordPress', 'PHP', 'HTML', 'CSS', 'Google Analytics 4', 'Google Tag Manager', 'Google Search Console', 'SEO', 'SEM'],
  },
  {
    title: 'Desarrollador Web de Aplicaciones',
    company: 'Prensa y Entretenimiento Agencia Creativa, Cali',
    period: 'May. 2023 - Oct. 2023',
    description: 'Participé en el diseño, desarrollo y mantenimiento de sitios web dinámicos y estáticos. Implementé apps con React.js y Node.js, integré Firebase y Strapi, realicé migraciones y actualizaciones, configuré hosting y dominios, y desarrollé interfaces responsivas con Tailwind y Bootstrap.',
    highlights: ['React.js', 'Node.js', 'TypeScript', 'Firebase', 'Strapi', 'WordPress', 'Tailwind CSS', 'Bootstrap', 'npm', 'Yarn'],
  },
  {
    title: 'Diseñador y Desarrollador Web',
    company: 'Seguracc, Cali',
    period: '2013 - 2015',
    description: 'Participé en el diseño, desarrollo y optimización de soluciones digitales que fortalecen la presencia online y mejoran la experiencia del usuario. Desarrollé themes personalizados con PHP, HTML, CSS y JavaScript, implementé sitios y blogs dinámicos, construí una plataforma de cursos online, e integré plugins, APIs y herramientas externas. Optimicé rendimiento, seguridad y SEO técnico, y apoyé migraciones hacia React y Next.js.',
    highlights: ['WordPress', 'PHP', 'Google Analytics 4', 'Google Tag Manager', 'SEO técnico', 'SEM', 'Integración de plugins y APIs externas'],
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
              <div className="flex flex-wrap gap-2 pb-5">
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
              <h3 className="font-display font-semibold text-xl mb-6">
                Otras cosas que me definen
              </h3>
              <div className="flex flex-col gap-4 pb-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <CalendarCheck className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">De mi interes</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Asisto frecuentemente a conferencias de desarrollo y eventos de tecnología,
                      donde aprendo y actualizo conocimientos en cada oportunidad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Aprendiendo otras cosas</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Disfruto estudiar y conocer nuevos temas que me permitan seguir creciendo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Plane className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Mi pasión</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Viajar y conocer países nuevos, explorar su gastronomía y disfrutar del paisajismo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
