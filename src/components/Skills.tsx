import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Front-End',
    skills: ['HTML5', 'CSS3', 'TailwindCSS', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'TypeScript', 'Responsive Design', 'UI/UX Optimization'],
  },
  {
    title: 'WordPress',
    skills: ['Custom Themes', 'Elementor', 'PHP for WordPress', 'Custom Post Types', 'ACF (Advanced Custom Fields)', 'WooCommerce', 'Performance Optimization', 'API Integrations'],
  },
  {
    title: 'Back-End & Tools',
    skills: ['Node.js', 'Express.js', 'Git / GitHub', 'REST APIs', 'JSON / AJAX', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Automation & CRM',
    skills: ['Zapier', 'n8n', 'HubSpot', 'Workflow Automation', 'API Integrations', 'Data Pipelines'],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Technical Expertise</span>
          <h2 className="section-title mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A comprehensive toolkit built over years of hands-on experience building modern web applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="font-display font-semibold text-xl mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
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
