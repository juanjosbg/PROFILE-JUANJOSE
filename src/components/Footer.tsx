import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

type Language = 'es' | 'en';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="font-display text-xl font-bold">
              <span className="gradient-text">Juan Jose</span>
              <span className="text-foreground"> Borrero</span>
            </a>
            <p className="text-sm text-muted-foreground">
              {language === 'es'
                ? `© ${currentYear} Juan Jose Borrero. Cali, Colombia.`
                : `© ${currentYear} Juan Jose Borrero. Cali, Colombia.`}
            </p>
          </div>

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
              href="https://www.linkedin.com/in/juanjoseborrero/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:juanjoseborrero95@gmail.com"
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Mail size={18} />
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
