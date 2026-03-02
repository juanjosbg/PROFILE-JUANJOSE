import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CalendarCheck, BookOpen, Plane } from 'lucide-react';

type Language = 'es' | 'en';

interface ExperienceProps {
  language: Language;
}

type ExperienceItem = {
  title: Record<Language, string>;
  company: string;
  period: string;
  description: Record<Language, string>;
  highlights: string[];
};

const experiences: ExperienceItem[] = [
  {
    title: { es: 'Web Designer & Developer', en: 'Web Designer & Developer' },
    company: 'Clinica Colombia ES, Cali',
    period: 'Jul 2025 - Present',
    description: {
      es: 'Lidero iniciativas de desarrollo de software y desarrollo web para la clinica, con foco en arquitectura frontend, estructura de componentes reutilizables y escalabilidad en React/Next.js. Diseño soluciones mantenibles, integro WordPress y APIs, y optimizo el rendimiento tecnico para mejorar conversion y operacion digital.',
      en: 'I lead software and web development initiatives for the clinic, focused on frontend architecture, reusable component structure, and scalability with React/Next.js. I design maintainable solutions, integrate WordPress and APIs, and optimize technical performance to improve conversion and digital operations.',
    },
    highlights: [
      'WordPress','PHP','HTML5','CSS3','JavaScript (ES6+)','React','Next.js','GA4','GTM','GSC','SEO tecnico','SEM','SQL','APIs',
    ],
  },
  {
    title: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
    company: 'GP3Digital, Cali (Freelance / Contrato por proyecto)',
    period: 'Apr 2025 - Present',
    description: {
      es: 'Como freelance, participo en la creacion, migracion y optimizacion de soluciones digitales para clientes de salud, comercio y agencias. He implementado blogs y sitios WordPress optimizando velocidad y SEO; desarrollado productos escalables con React, Next.js y TypeScript; diseniado interfaces responsivas con foco en UX, accesibilidad (WCAG) y Core Web Vitals; integrado CMS (Strapi y WordPress), Firebase y APIs; y automatizado captura de leads y contacto con Zapier y formularios conectados a CRM.',
      en: 'As a freelance developer, I work on creation, migration, and optimization of digital solutions for health, commerce, and agency clients. I have implemented WordPress blogs and websites improving speed and SEO; delivered scalable products with React, Next.js, and TypeScript; designed responsive interfaces focused on UX, accessibility (WCAG), and Core Web Vitals; integrated CMS platforms (Strapi and WordPress), Firebase, and external APIs; and automated lead capture and contact workflows with Zapier and CRM-connected forms.',
    },
    highlights: ['WordPress','React.js','Next.js','TypeScript','Strapi','Firebase','HTML','CSS','SEO tecnico','Zapier','APIs REST','WCAG','Core Web Vitals',
    ],
  },
  {
    title: { es: 'Desarrollador Frontend', en: 'Frontend Developer' },
    company: 'Preztel SAS, Cali',
    period: 'Feb 2025 - Jul 2025',
    description: {
      es: 'Participe en el desarrollo de soluciones fintech con foco principal en aplicaciones moviles. Desarrolle una app multiplataforma para envios internacionales con React Native, priorizando rendimiento, seguridad y experiencia de usuario. Adicionalmente, contribui a plataformas web corporativas en WordPress con funcionalidades personalizadas, optimizacion tecnica (WPO), interfaces responsivas y flujo colaborativo bajo Scrum con Git/GitHub.',
      en: 'I contributed to fintech solutions with a primary focus on mobile app development. I built a cross-platform app for international transfers using React Native, prioritizing performance, security, and user experience. I also supported corporate WordPress platforms with custom features, technical optimization (WPO), responsive interfaces, and team delivery under Scrum using Git/GitHub.',
    },
    highlights: [
      'React Native',
      'Mobile Development',
      'Firebase',
      'WordPress',
      'PHP',
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'WPO',
      'Scrum',
      'Git/GitHub',
    ],
  },
  {
    title: { es: 'Disenador y Desarrollador Web', en: 'Web Designer and Developer' },
    company: 'Magica Escultura, Cali',
    period: 'Aug 2024 - Feb 2025',
    description: {
      es: 'Estuve a cargo de la migracion, rediseno UI/UX y evolucion tecnica del e-commerce de una clinica de cirugia estetica. Lideré el desarrollo en WordPress y PHP, creando themes y plugins personalizados para mejorar la estructura del sitio, la administracion de contenidos y la escalabilidad. Ademas, implemente SEO tecnico, medicion con GA4/GTM/GSC, campanas SEM y automatizaciones para fortalecer conversion y rendimiento comercial.',
      en: 'I led the migration, UI/UX redesign, and technical evolution of an aesthetic clinic e-commerce platform. I was responsible for WordPress and PHP development, creating custom themes and plugins to improve site structure, content administration, and scalability. I also implemented technical SEO, GA4/GTM/GSC measurement, SEM campaigns, and automations to improve conversion and commercial performance.',
    },
    highlights: ['WordPress','PHP','Custom Themes','Custom Plugins','UI/UX','SEO tecnico','SEM','GA4','GTM','GSC','APIs','E-commerce',
    ],
  },
  {
    title: { es: 'Desarrollador Web de Aplicaciones', en: 'Web Application Developer' },
    company: 'Prensa y Entretenimiento, Cali',
    period: 'May 2023 - Oct 2023',
    description: {
      es: 'Diseno, desarrollo y mantenimiento de sitios y apps con React, Node.js, Firebase y Strapi.',
      en: 'Designed, developed and maintained websites and apps with React, Node.js, Firebase and Strapi.',
    },
    highlights: ['React.js', 'Node.js', 'TypeScript', 'Firebase', 'Strapi'],
  },
];

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
          'SEO tecnico y analitica digital',
          'Performance web y Core Web Vitals',
          'Automatizacion con n8n y Zapier',
          'Integracion de APIs y CMS',
          'Migraciones y optimizacion de plataformas',
          'UX orientada a conversion',
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
