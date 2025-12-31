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
            <div className="space-y-4 text-muted-foreground leading-relaxed text-justify">
              <p>Soy Frontend Developer con experiencia en el diseño y desarrollo de aplicaciones web modernas,
                escalables y orientadas a rendimiento.
                Me especializo en construir interfaces que combinan
                <strong className="text-foreground"> criterio visual, performance, accesibilidad y objetivos de negocio</strong>, no solo “UI bonita”.
              </p>
              <p>
                Trabajo principalmente con <strong className="text-foreground">React, Next.js, TypeScript,
                TailwindCSS y Supebase</strong>,desarrollando soluciones mantenibles y optimizadas. 
                Cuento con un sólido dominio de <strong className="text-foreground"> WordPress</strong> (themes personalizados, SEO técnico y optimización para conversión), 
                así como experiencia en e-commerce y migraciones tecnológicas.
              </p>
              <p>
                Tengo experiencia integrando bases de datos como 
                <strong className="text-foreground">Firebase, Supabase y MySQL</strong>, y actualmente profundizo en 
                <strong className="text-foreground">automatización con n8n</strong>, creando flujos inteligentes que mejoran procesos internos, captación de leads y experiencia del usuario.
              </p>
              <p>
                Me caracterizo por el pensamiento crítico, la atención al detalle y el trabajo colaborativo, 
                aportando soluciones técnicas alineadas con producto, marketing y negocio.
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
