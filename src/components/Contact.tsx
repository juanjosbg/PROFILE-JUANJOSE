import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            Contacto
          </span>
          <h2 className="section-title mb-4">
            ¿Tienes un proyecto?
          </h2>
          <p className="section-subtitle mx-auto">
            Hablemos sobre cómo puedo ayudarte a construir tu próxima idea
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 text-center"
          >
            {/* Main CTA */}
            <div className="mb-10">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-primary" size={36} />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">
                Conversemos
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Ya sea que necesites un sitio web, una aplicación, o simplemente 
                quieras discutir ideas, estoy disponible.
              </p>
              <a
                href="mailto:juanjosbg@email.com"
                className="btn-primary text-lg"
              >
                <Mail size={20} />
                Enviar email
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">o encuéntrame en</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">juanjosbg@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium">Cali, Colombia</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/juanjosbg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:juanjosbg@email.com"
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Send size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
