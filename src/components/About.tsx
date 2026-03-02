import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Target, TrendingUp, Cog } from 'lucide-react';

type Language = 'es' | 'en';

interface AboutProps {
  language: Language;
}

const About = ({ language }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights =
    language === 'es'
      ? [
          {
            icon: Target,
            title: 'CMS y E-commerce',
            description: 'WordPress personalizado, Shopify y gestión de contenido orientada a negocio.',
          },
          {
            icon: Zap,
            title: 'Desarrollo Frontend',
            description: 'React, Next.js, TypeScript y JavaScript para interfaces sólidas y escalables.',
          },
          {
            icon: TrendingUp,
            title: 'SEO Técnico y Analítica',
            description: 'GA4, Google Tag Manager, Search Console, SEM y CRO para mejorar resultados.',
          },
          {
            icon: Cog,
            title: 'Automatización',
            description: 'Automatizaciones con n8n y Zapier, conectando APIs, formularios y flujos clave.',
          },
        ]
      : [
          {
            icon: Target,
            title: 'CMS and E-commerce',
            description: 'Custom WordPress, Shopify, and business-focused content management.',
          },
          {
            icon: Zap,
            title: 'Frontend Development',
            description: 'React, Next.js, TypeScript, and JavaScript for robust, scalable interfaces.',
          },
          {
            icon: TrendingUp,
            title: 'Technical SEO and Analytics',
            description: 'GA4, Google Tag Manager, Search Console, SEM, and CRO for better performance.',
          },
          {
            icon: Cog,
            title: 'Automation',
            description: 'Automations with n8n and Zapier, connecting APIs, forms, and key workflows.',
          },
        ];

  const text =
    language === 'es'
      ? {
          label: 'Sobre mí',
          title: 'Un poco de mí',
          p1: 'Soy Desarrollador Web con más de 3 años de experiencia creando sitios web y aplicaciones web rápidas, escalables y orientadas a resultados.',
          p2: 'Mi foco principal es el desarrollo web: WordPress personalizado, React/Next.js, TypeScript, TailwindCSS e integración con bases de datos como Firebase, Supabase y MySQL.',
          p3: 'Combino desarrollo frontend con SEO técnico, SEM, CRO y automatización (n8n, Zapier) para impulsar tráfico, leads y conversiones, con un perfil en evolución hacia Full Stack.',
          spanish: 'Español',
          spanishLevel: 'Nativo',
          english: 'Inglés',
          englishLevel: 'Intermedio B1',
        }
      : {
          label: 'About',
          title: 'A little about me',
          p1: 'I am a Web Developer with 3+ years of experience building fast, scalable and result-driven websites and web applications.',
          p2: 'My core focus is web development: custom WordPress, React/Next.js, TypeScript, TailwindCSS, and database integrations with Firebase, Supabase and MySQL.',
          p3: 'I combine frontend development with technical SEO, SEM, CRO and automation (n8n, Zapier) to improve traffic, lead generation and conversions, while growing into a Full Stack profile.',
          spanish: 'Spanish',
          spanishLevel: 'Native',
          english: 'English',
          englishLevel: 'Intermediate B1',
        };

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              {text.label}
            </span>
            <h2 className="section-title mb-6">{text.title}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>{text.p1}</p>
              <p>{text.p2}</p>
              <p>{text.p3}</p>
            </div>

            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{text.spanish}</p>
                <p className="font-medium">{text.spanishLevel}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">{text.english}</p>
                <p className="font-medium">{text.englishLevel}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 hover:border-primary/20 group"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
