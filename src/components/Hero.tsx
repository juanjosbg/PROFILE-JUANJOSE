import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Code2, Smartphone, Palette } from 'lucide-react';

type Language = 'es' | 'en';

interface HeroProps {
  language: Language;
}

const Hero = ({ language }: HeroProps) => {
  const text =
    language === 'es'
      ? {
          title: 'React - N8N - IA',
          subtitle: 'Creo apps con React, automatizo con n8n y sumo agentes de IA.',
          description:
            'Soy Juan José Borrero. Construyo aplicaciones con React y TypeScript e integro inteligencia artificial para conectar herramientas, automatizar procesos y crear experiencias útiles.',
          viewProjects: 'Ver proyectos',
          contact: 'Contactar',
          cv: 'Descargar CV',
          cvPending: 'CV pendiente',
        }
      : {
          title: 'React - N8N - IA',
          subtitle: 'Web apps with React, n8n automation, and AI agents.',
          description:
            'I am Juan José Borrero. I build applications with React and TypeScript and integrate artificial intelligence to connect tools, automate processes and create useful experiences.',
          viewProjects: 'View projects',
          contact: 'Contact',
          cv: 'Download CV',
          cvPending: 'CV coming soon',
        };

  return (
    <section className="min-h-screen hero-gradient relative flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pattern-grid opacity-30 dark:opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <Smartphone className="text-primary" size={20} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <Code2 className="text-foreground" size={20} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
            >
              <Palette className="text-primary" size={20} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-4"
          >
            <span className="gradient-text">{text.title}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-display font-semibold text-foreground mb-6 tracking-wide"
          >
            {text.subtitle}
          </motion.h2>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mb-10 text-lg leading-relaxed text-balance"
          >
            {text.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 mb-12"
          >
            <a
              href="https://github.com/juanjosbg" aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/juanjoseborrero/" aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:juanjoseborrero95@gmail.com" aria-label="Email"
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projects" className="btn-primary">
              {text.viewProjects}
            </a>
            <a href="#contact" className="btn-secondary">
              {text.contact}
            </a>
            <a href="/cv-juan-jose-borrero.pdf" download className="btn-secondary" aria-disabled={!import.meta.env.VITE_CV_AVAILABLE} onClick={e=>{if(!import.meta.env.VITE_CV_AVAILABLE)e.preventDefault();}} title={!import.meta.env.VITE_CV_AVAILABLE?text.cvPending:undefined}>{import.meta.env.VITE_CV_AVAILABLE?text.cv:text.cvPending}</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex justify-center sm:absolute sm:-bottom-20 sm:left-1/2 sm:-translate-x-1/2 sm:mt-0"
          >
            <motion.a
              href="#about" aria-label={language === 'es' ? 'Ir a Sobre mí' : 'Go to About'}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowDown size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
