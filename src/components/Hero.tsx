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
          title: 'Fullstack Engineer',
          subtitle:
            'REACT \u00b7 NODE.JS \u00b7 APIs REST \u00b7 SQL \u00b7 AUTOMATIZACI\u00d3N Y ARQUITECTURA WEB',
          description:
            'Soy Juan Jos\u00e9 Borrero, Fullstack Engineer especializado en desarrollo web y arquitectura de aplicaciones: construyo soluciones robustas, escalables y mantenibles con React, Node.js, APIs REST y SQL.',
          viewProjects: 'Ver proyectos',
          contact: 'Contactar',
        }
      : {
          title: 'Fullstack Engineer',
          subtitle: 'REACT · NODE.JS · REST APIs · SQL · AUTOMATION & WEB ARCHITECTURE',
          description:
            'I am Juan Jose Borrero, a Fullstack Engineer focused on building fast, scalable, and result-driven websites and web applications.',
          viewProjects: 'View projects',
          contact: 'Contact',
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
            initial={{ opacity: 0, y: 30 }}
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
            initial={{ opacity: 0, y: 30 }}
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
              href="https://github.com/juanjosbg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/juanjoseborrero/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:juanjoseborrero95@gmail.com"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex justify-center sm:absolute sm:-bottom-20 sm:left-1/2 sm:-translate-x-1/2 sm:mt-0"
          >
            <motion.a
              href="#about"
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
