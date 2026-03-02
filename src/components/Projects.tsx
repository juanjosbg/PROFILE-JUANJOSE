import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

type Language = 'es' | 'en';

interface ProjectsProps {
  language: Language;
}

type Project = {
  title: string;
  description: Record<Language, string>;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  status: 'active' | 'progress' | 'building';
  featured: boolean;
};

const projects: Project[] = [
  {
    title: 'Loki Ecommerce',
    description: {
      es: 'E-commerce para marca de moda con autenticación OTP, pagos vía API e inventario por SKU en Supabase. Incluye una capa completa de crecimiento digital con SEO técnico, Google Tag Manager, Google Analytics 4 y Google Search Console, además de automatizaciones con n8n e integración de reels en tiempo real desde Instagram.',
      en: 'E-commerce for a fashion brand with OTP authentication, API-based payments, and SKU-level inventory in Supabase. It includes a full digital growth layer with technical SEO, Google Tag Manager, Google Analytics 4, and Google Search Console, plus n8n automations and a real-time Instagram reels integration.',
    },
    tech: [
      'React',
      'TypeScript',
      'Supabase',
      'Node.js',
      'Vercel',
      'Technical SEO',
      'GA4',
      'GTM',
      'GSC',
      'n8n',
      'Instagram Reels API',
    ],
    image: '/images/lOKI.png',
    liveUrl: 'https://www.thelokistore.com/',
    githubUrl: 'https://github.com/juanjosbg/Loki-Ecommerce',
    status: 'building',
    featured: true,
  },
  {
    title: 'Gym Ecommerce Hub',
    description: {
      es: 'Tienda fitness para Mexico con panel admin, analitica de ventas, control de inventario y automatizaciones para agendamiento, mensajes y leads.',
      en: 'Fitness e-commerce for Mexico with admin panel, sales analytics, inventory control, and automations for scheduling, messaging, and leads.',
    },
    tech: ['React', 'TypeScript', 'Supabase', 'n8n'],
    image: '/images/Fitmex.png',
    liveUrl: 'https://gym-ecommerce-hub.vercel.app/',
    githubUrl: 'https://github.com/juanjosbg/gymEcommerce-hub',
    status: 'active',
    featured: true,
  },
  {
    title: 'GP3Digital Web',
    description: {
      es: 'Sitio corporativo para agencia de marketing digital con proceso de migración y actualizaciones técnicas continuas. Se mejoró el SEO técnico, la medición con Google Tag Manager y Google Analytics, y actualmente se integra n8n para automatizar flujos de captación y seguimiento.',
      en: 'Corporate website for a digital marketing agency with an ongoing migration and technical updates. Technical SEO was improved, measurement was optimized through Google Tag Manager and Google Analytics, and n8n is being integrated to automate lead capture and follow-up workflows.',
    },
    tech: ['React', 'TailwindCSS', 'Vercel', 'Strapi', 'Technical SEO', 'GTM', 'GA4', 'n8n'],
    image: '/images/Gp3.png',
    liveUrl: 'https://gp3-app.vercel.app/',
    githubUrl: 'https://github.com/Gp3Marketing/Gp3App',
    status: 'active',
    featured: true,
  },
  {
    title: 'CIMELCO',
    description: {
      es: 'Rediseño y migración del sitio de una empresa de servicios eléctricos hacia una plataforma dinámica en React, incorporando un blog administrable con Strapi. Se optimizó la analítica digital y se fortaleció la estrategia de SEO y SEM para mejorar el posicionamiento y la captación de tráfico calificado.',
      en: 'Redesign and migration of an electrical services company website into a dynamic React platform, including a Strapi-powered blog management section. Digital analytics were enhanced, and SEO/SEM strategy was strengthened to improve search positioning and qualified traffic acquisition.',
    },
    tech: ['React', 'Strapi', 'SEO', 'SEM', 'Analytics', 'Netlify'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=800&fit=crop',
    liveUrl: 'https://deploybranch--cimelco.netlify.app/',
    githubUrl: 'https://github.com/juanjosbg/CIMELCO',
    status: 'active',
    featured: false,
  },
  {
    title: 'Chatbot App',
    description: {
      es: 'Aplicacion de chatbot con arquitectura tipo ChatGPT para respuestas inteligentes.',
      en: 'Chatbot application with ChatGPT-like architecture for intelligent responses.',
    },
    tech: ['Python', 'AI', 'API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=800&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/juanjosbg/Chatbot-app',
    status: 'progress',
    featured: false,
  },
];

const PhoneMockup = ({ image, title }: { image: string; title: string }) => (
  <div className="phone-mockup w-48 md:w-56 mx-auto">
    <div className="phone-mockup-screen">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
  </div>
);

const Projects = ({ language }: ProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const descriptionLimit = 170;
  const expandableProjects = new Set(['Gym Ecommerce Hub', 'Loki Ecommerce']);

  const text =
    language === 'es'
      ? {
          label: 'Portafolio',
          title: 'Proyectos Destacados',
          subtitle: 'Seleccion de proyectos reales en los que he trabajado',
          otherProjects: 'Otros Proyectos',
          readMore: 'Leer mas',
          readLess: 'Leer menos',
          demo: 'Ver demo',
          repo: 'Repositorio',
          code: 'Codigo',
          status: {
            active: 'Activo',
            progress: 'En desarrollo',
            building: 'En construccion',
          },
        }
      : {
          label: 'Portfolio',
          title: 'Featured Projects',
          subtitle: 'A selection of real projects I have worked on',
          otherProjects: 'Other Projects',
          readMore: 'Read more',
          readLess: 'Read less',
          demo: 'View demo',
          repo: 'Repository',
          code: 'Code',
          status: {
            active: 'Active',
            progress: 'In progress',
            building: 'Building',
          },
        };

  const toggleDescription = (title: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getDescriptionPreview = (textValue: string) => {
    if (textValue.length <= descriptionLimit) {
      return textValue;
    }
    return `${textValue.slice(0, descriptionLimit).trim()}...`;
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32" ref={ref}>
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

        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
            >
              <motion.div
                className="flex-shrink-0"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              >
                <PhoneMockup image={project.image} title={project.title} />
              </motion.div>

              <div className="flex-1 glass-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display font-bold text-2xl md:text-3xl">{project.title}</h3>
                  <span
                    className={`badge-status ${
                      project.status === 'active' ? 'badge-status-active' : 'badge-status-progress'
                    }`}
                  >
                    {text.status[project.status]}
                  </span>
                </div>

                <p className="text-muted-foreground mb-2 leading-relaxed text-lg">
                  {expandableProjects.has(project.title) && !expandedDescriptions[project.title]
                    ? getDescriptionPreview(project.description[language])
                    : project.description[language]}
                </p>
                {expandableProjects.has(project.title) && project.description[language].length > descriptionLimit && (
                  <button
                    type="button"
                    onClick={() => toggleDescription(project.title)}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-6"
                    aria-expanded={expandedDescriptions[project.title] ?? false}
                  >
                    {expandedDescriptions[project.title] ? text.readLess : text.readMore}
                  </button>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <ExternalLink size={16} />
                      {text.demo}
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    <Github size={16} />
                    {text.repo}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display font-semibold text-xl mb-8 text-center">{text.otherProjects}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="project-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-display font-semibold text-lg">{project.title}</h4>
                  <span
                    className={`badge-status ${
                      project.status === 'active' ? 'badge-status-active' : 'badge-status-progress'
                    }`}
                  >
                    {text.status[project.status]}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
                  {project.description[language]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Github size={14} />
                    {text.code}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;


