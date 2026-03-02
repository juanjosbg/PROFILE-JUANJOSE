import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Language = 'es' | 'en';

interface NavbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const Navbar = ({ language, onLanguageChange }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const withHomePath = (hash: string) => (isHome ? hash : `/${hash}`);
  const contactHref = withHomePath('#contact');

  const navLinks =
    language === 'es'
      ? [
          { name: 'Sobre mí', href: withHomePath('#about') },
          { name: 'Habilidades', href: withHomePath('#skills') },
          { name: 'Proyectos', href: withHomePath('#projects') },
          { name: 'Experiencia', href: withHomePath('#experience') },
          { name: 'Certificaciones', href: '/certifications' },
          { name: 'Contacto', href: contactHref },
        ]
      : [
          { name: 'About', href: withHomePath('#about') },
          { name: 'Skills', href: withHomePath('#skills') },
          { name: 'Projects', href: withHomePath('#projects') },
          { name: 'Experience', href: withHomePath('#experience') },
          { name: 'Certifications', href: '/certifications' },
          { name: 'Contact', href: contactHref },
        ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="/"
            className="font-display text-xl md:text-2xl font-bold"
            whileHover={{ scale: 1.02 }}
          >
            <span className="gradient-text">Juan José</span>
            <span className="text-foreground"> Borrero</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              aria-label={language === 'es' ? 'Cambiar tema' : 'Toggle theme'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
              className="h-10 px-3 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors text-sm font-semibold"
              aria-label={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              {language === 'es' ? 'ES' : 'EN'}
            </button>
            <a href={contactHref} className="hidden md:flex btn-primary text-sm py-2.5">
              {language === 'es' ? 'Contactar' : 'Contact'}
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
              aria-label={language === 'es' ? 'Abrir menú' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link py-3 px-4 rounded-lg hover:bg-muted"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={contactHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-2"
              >
                {language === 'es' ? 'Contactar' : 'Contact'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
