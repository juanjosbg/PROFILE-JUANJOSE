import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Send, MessageCircle } from 'lucide-react';

type Language = 'es' | 'en';

interface ContactProps {
  language: Language;
}

const Contact = ({ language }: ContactProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const text =
    language === 'es'
      ? {
          label: 'Contacto',
          title: 'Tienes un proyecto?',
          subtitle: 'Hablemos sobre como puedo ayudarte con tu proxima idea',
          ctaTitle: 'Conversemos',
          ctaBody: 'Ya sea que necesites un sitio web o una aplicacion, estoy disponible.',
          sendEmail: 'Enviar email',
          findMe: 'o encuentrame en',
          location: 'Ubicacion',
        }
      : {
          label: 'Contact',
          title: 'Do you have a project?',
          subtitle: 'Let us talk about how I can help with your next idea',
          ctaTitle: 'Let us talk',
          ctaBody: 'Whether you need a website or an app, I am available.',
          sendEmail: 'Send email',
          findMe: 'or find me on',
          location: 'Location',
        };

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
            {text.label}
          </span>
          <h2 className="section-title mb-4">{text.title}</h2>
          <p className="section-subtitle mx-auto">{text.subtitle}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <div className="mb-10">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-primary" size={36} />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">{text.ctaTitle}</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">{text.ctaBody}</p>
              <a href="mailto:juanjoseborrero95@gmail.com" className="btn-primary text-lg">
                <Mail size={20} />
                {text.sendEmail}
              </a>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">{text.findMe}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">juanjoseborrero95@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">{text.location}</p>
                  <p className="font-medium">Cali, Colombia</p>
                </div>
              </div>
            </div>

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
                href="https://www.linkedin.com/in/juanjoseborrero/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:juanjoseborrero95@gmail.com"
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
