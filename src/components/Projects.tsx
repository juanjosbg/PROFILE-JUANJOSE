import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Custom Business Website',
    description: 'A fully custom WordPress website for a consulting firm with advanced animations, custom post types, and seamless CRM integration.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'ACF', 'HubSpot'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'High-Conversion Landing Page',
    description: 'Marketing landing page optimized for lead generation with A/B testing, form automation, and analytics integration.',
    tech: ['React', 'TailwindCSS', 'Framer Motion', 'Zapier'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-featured WooCommerce store with custom checkout flow, payment integrations, and inventory management system.',
    tech: ['WordPress', 'WooCommerce', 'PHP', 'Stripe API'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    title: 'React Dashboard App',
    description: 'Interactive admin dashboard with real-time data visualization, user management, and responsive design.',
    tech: ['React', 'TypeScript', 'Recharts', 'REST API'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'Automation Workflow System',
    description: 'Complex n8n workflow connecting multiple services for automated lead processing and CRM synchronization.',
    tech: ['n8n', 'REST APIs', 'HubSpot', 'Webhooks'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    title: 'API Integration Hub',
    description: 'Middleware application connecting various third-party services with custom data transformation and error handling.',
    tech: ['Node.js', 'Express', 'REST APIs', 'MongoDB'],
    image: '/placeholder.svg',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Portfolio</span>
          <h2 className="section-title mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A selection of projects that showcase my skills in front-end development, WordPress, and automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`project-card group ${project.featured ? 'md:col-span-1' : ''}`}
            >
              {/* Project Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6 bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-sm">Project Preview</span>
                </div>
              </div>

              {/* Project Info */}
              <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <a
                  href={project.liveUrl}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Projects on GitHub
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
