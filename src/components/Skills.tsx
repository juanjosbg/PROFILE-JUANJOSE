import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Avanzado' },
      { name: 'Next.js', level: 'Avanzado' },
      { name: 'TypeScript', level: 'Avanzado' },
      { name: 'JavaScript', level: 'Avanzado' },
      { name: 'TailwindCSS', level: 'Avanzado' },
      { name: 'SCSS', level: 'Intermedio' },
      { name: 'HTML5', level: 'Avanzado' },
      { name: 'CSS3', level: 'Avanzado' },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 'Intermedio' },
      { name: 'Firebase', level: 'Intermedio' },
      { name: 'Supabase', level: 'Intermedio' },
      { name: 'MySQL', level: 'Intermedio' },
      { name: 'REST APIs', level: 'Avanzado' },
    ],
  },
  {
    title: 'WordPress',
    skills: [
      { name: 'Custom Themes', level: 'Avanzado' },
      { name: 'PHP', level: 'Intermedio' },
      { name: 'SEO', level: 'Avanzado' },
      { name: 'Plugins', level: 'Intermedio' },
      { name: 'WooCommerce', level: 'Básico' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', level: 'Avanzado' },
      { name: 'GitHub', level: 'Avanzado' },
      { name: 'Vercel', level: 'Avanzado' },
      { name: 'Netlify', level: 'Intermedio' },
      { name: 'n8n', level: 'Aprendiendo' },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
            Habilidades
          </span>
          <h2 className="section-title mb-4">
            Stack Tecnológico
          </h2>
          <p className="section-subtitle mx-auto">
            Tecnologías y herramientas con las que trabajo día a día
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="flex items-center justify-between group"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
