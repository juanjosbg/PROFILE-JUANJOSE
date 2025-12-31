import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Loki Ecommerce',
    description: 'Plataforma e-commerce completa con carrito de compras, gestión de productos y pagos integrados.',
    tech: ['React', 'TypeScript', 'Supabase', 'Node.js', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop',
    liveUrl: 'https://www.thelokistore.com/',
    githubUrl: 'https://github.com/juanjosbg/Loki-Ecommerce',
    status: 'En construcción',
    featured: true,
  },
  {
    title: 'Gym Ecommerce Hub',
    description: 'E-commerce especializado para gimnasios con catálogo de productos y sistema de gestión. Migración de Firebase a Supabase.',
    tech: ['React', 'TypeScript', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=800&fit=crop',
    liveUrl: 'https://gym-ecommerce-hub.vercel.app/',
    githubUrl: 'https://github.com/juanjosbg/gymEcommerce-hub',
    status: 'Activo',
    featured: true,
  },
  {
    title: 'GP3Digital Web',
    description: 'Sitio web corporativo moderno para agencia de marketing digital con diseño responsive y optimizado para SEO.',
    tech: ['React', 'TailwindCSS', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=800&fit=crop',
    liveUrl: 'https://gp3-app.vercel.app/',
    githubUrl: 'https://github.com/Gp3Marketing/Gp3App',
    status: 'Activo',
    featured: true,
  },
  {
    title: 'CIMELCO',
    description: 'Sitio web empresarial para compañía de servicios eléctricos con catálogo de servicios y formulario de contacto.',
    tech: ['React', 'CSS', 'Netlify'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=800&fit=crop',
    liveUrl: 'https://deploybranch--cimelco.netlify.app/',
    githubUrl: 'https://github.com/juanjosbg/CIMELCO',
    status: 'Activo',
    featured: false,
  },
  {
    title: 'Chatbot App',
    description: 'Aplicación de chatbot con inteligencia artificial, arquitectura tipo ChatGPT para respuestas inteligentes.',
    tech: ['Python', 'IA', 'API'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=800&fit=crop',
    liveUrl: '#',
    githubUrl: 'https://github.com/juanjosbg/Chatbot-app',
    status: 'En desarrollo',
    featured: false,
  },
];

const PhoneMockup = ({ image, title }: { image: string; title: string }) => (
  <div className="phone-mockup w-48 md:w-56 mx-auto">
    <div className="phone-mockup-screen">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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
            Portafolio
          </span>
          <h2 className="section-title mb-4">
            Proyectos Destacados
          </h2>
          <p className="section-subtitle mx-auto">
            Una selección de proyectos reales en los que he trabajado
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Phone Mockup */}
              <motion.div
                className="flex-shrink-0"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              >
                <PhoneMockup image={project.image} title={project.title} />
              </motion.div>

              {/* Project Info */}
              <div className="flex-1 glass-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display font-bold text-2xl md:text-3xl">
                    {project.title}
                  </h3>
                  <span className={`badge-status ${
                    project.status === 'Activo' ? 'badge-status-active' : 'badge-status-progress'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <ExternalLink size={16} />
                      Ver demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    <Github size={16} />
                    Repositorio
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display font-semibold text-xl mb-8 text-center">
            Otros Proyectos
          </h3>
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
                  <h4 className="font-display font-semibold text-lg">
                    {project.title}
                  </h4>
                  <span className={`badge-status ${
                    project.status === 'Activo' ? 'badge-status-active' : 'badge-status-progress'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
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
                    Código
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
