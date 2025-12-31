import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Code2, Smartphone, Palette } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen hero-gradient relative flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30 dark:opacity-10" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Animated icons */}
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

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-4"
          >
            <span className="gradient-text">Frontend Developer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-foreground mb-6"
          >
            Creando experiencias digitales
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mb-10 text-lg leading-relaxed text-balance"
          >
            Soy <strong className="text-foreground">Juan José Borrero</strong>, desarrollador frontend 
            especializado en React, Web Performance y SEO. Construyo experiencias web modernas, 
            rápidas y orientadas a conversión.
          </motion.p>

          {/* Social Links */}
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
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:juanjosbg@email.com"
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <Mail size={20} />
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projects" className="btn-primary">
              Ver proyectos
            </a>
            <a href="#contact" className="btn-secondary">
              Contactar
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
