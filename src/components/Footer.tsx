import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="font-display text-xl font-bold">
              <span className="gradient-text">JJ</span>
              <span className="text-foreground">.dev</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Juan José Borrero. Cali, Colombia.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/juanjosbg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:juanjosbg@email.com"
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
