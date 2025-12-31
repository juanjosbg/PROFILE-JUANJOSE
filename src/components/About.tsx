import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Target, TrendingUp, Cog } from 'lucide-react';

const highlights = [
  {
    icon: Target,
    title: 'UI Moderna',
    description: 'Interfaces limpias, elegantes y centradas en el usuario',
  },
  {
    icon: Zap,
    title: 'Performance Web',
    description: 'Optimización de carga y rendimiento para mejor UX',
  },
  {
    icon: TrendingUp,
    title: 'SEO Técnico',
    description: 'Implementación de mejores prácticas para posicionamiento',
  },
  {
    icon: Cog,
    title: 'Automatización',
    description: 'Workflows automatizados con n8n y APIs',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              Sobre mí
            </span>
            <h2 className="section-title mb-6">
              Un poco de mí
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soy un desarrollador frontend con experiencia sólida en la creación de 
                aplicaciones web modernas y escalables. Mi enfoque está en construir 
                soluciones que no solo se vean bien, sino que también <strong className="text-foreground">funcionen 
                excepcional</strong>.
              </p>
              <p>
                Trabajo principalmente con <strong className="text-foreground">React, Next.js, TypeScript y 
                TailwindCSS</strong>. También tengo experiencia en WordPress, desarrollo de themes 
                personalizados, optimización SEO y automatización con n8n.
              </p>
              <p>
                Ubicado en <strong className="text-foreground">Cali, Colombia</strong>. Disponible para 
                proyectos remotos con equipos internacionales.
              </p>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Español</p>
                <p className="font-medium">Nativo</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Inglés</p>
                <p className="font-medium">Intermedio B1</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
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
