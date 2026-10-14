import { experiences } from '@/data/experience';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CalendarCheck, BookOpen, Plane } from 'lucide-react';

type Language = 'es' | 'en';

interface ExperienceProps {
  language: Language;
}



const Experience = ({ language }: ExperienceProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
  const descriptionLimit = 210;

  const strengths =
    language === 'es'
      ? [
          'Arquitectura Frontend (React/Next.js)',
          'Desarrollo WordPress y PHP',
          'SEO técnico y analítica digital',
          'Performance web y Core Web Vitals',
          'Automatización con n8n y Zapier',
          'Integración de APIs y CMS',
          'Migraciones y optimización de plataformas',
          'UX orientada a conversión',
        ]
      : [
          'Frontend Architecture (React/Next.js)',
          'WordPress and PHP Development',
          'Technical SEO and Digital Analytics',
          'Web Performance and Core Web Vitals',
          'Automation with n8n and Zapier',
          'API and CMS Integrations',
          'Platform Migration and Optimization',
          'Conversion-focused UX',
        ];

  const text =
    language === 'es'
      ? {
          label: 'Trayectoria',
          title: 'Experiencia Profesional',
          subtitle: 'Mi recorrido como desarrollador y habilidades clave',
          readMore: 'Ver mas',
          readLess: 'Ver menos',
          strengths: 'Fortalezas',
          other: 'Otras cosas que me definen',
          iCare: 'De mi interes',
          iCareBody: 'Asisto a conferencias y eventos para mantenerme actualizado.',
          learning: 'Aprendiendo',
          learningBody: 'Disfruto estudiar nuevas herramientas y tendencias.',
          passion: 'Mi pasion',
          passionBody: 'Viajar y conocer culturas nuevas.',
        }
      : {
          label: 'Journey',
          title: 'Professional Experience',
          subtitle: 'My path as a developer and key strengths',
          readMore: 'Read more',
          readLess: 'Read less',
          strengths: 'Strengths',
          other: 'Other things that define me',
          iCare: 'My interests',
          iCareBody: 'I attend conferences and events to stay up to date.',
          learning: 'Always learning',
          learningBody: 'I enjoy studying new tools and trends.',
          passion: 'My passion',
          passionBody: 'Traveling and discovering new cultures.',
        };

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getDescriptionPreview = (textValue: string) => {
    if (textValue.length <= descriptionLimit) {
      return textValue;
    }
    return `${textValue.slice(0, descriptionLimit).trim()}...`;
  };

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
            {text.label}
          </span>
          <h2 className="section-title mb-4">{text.title}</h2>
          <p className="section-subtitle mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="relative pl-8">
              <div className="timeline-line" />
              <div className="space-y-10">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={`${exp.company}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="timeline-dot" />
                    <div className="glass-card p-6 md:p-8 ml-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display font-semibold text-xl">{exp.title[language]}</h3>
                        <span className="text-sm text-primary font-medium">{exp.company}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{exp.period}</p>
                      <p className="text-muted-foreground mb-2 leading-relaxed">
                        {expandedDescriptions[index]
                          ? exp.description[language]
                          : getDescriptionPreview(exp.description[language])}
                      </p>
                      {exp.description[language].length > descriptionLimit && (
                        <button
                          type="button"
                          onClick={() => toggleDescription(index)}
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-4"
                          aria-expanded={expandedDescriptions[index] ?? false}
                        >
                          {expandedDescriptions[index] ? text.readLess : text.readMore}
                        </button>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map((highlight) => (
                          <span key={highlight} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground">
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-6 md:p-8 sticky top-24">
              <h3 className="font-display font-semibold text-xl mb-6">{text.strengths}</h3>
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
              <h3 className="font-display font-semibold text-xl mb-6">{text.other}</h3>
              <div className="flex flex-col gap-4 pb-2">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <CalendarCheck className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{text.iCare}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text.iCareBody}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{text.learning}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text.learningBody}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Plane className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{text.passion}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{text.passionBody}</p>
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
