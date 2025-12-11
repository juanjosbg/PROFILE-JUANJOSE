import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    period: '2020 - Present',
    description: 'Building custom web solutions for clients worldwide. Specializing in React, Next.js, and WordPress development with a focus on performance optimization and modern UI/UX.',
    highlights: ['React & Next.js Development', 'WordPress Custom Solutions', 'API Integrations', 'Performance Optimization'],
  },
  {
    title: 'WordPress Developer',
    company: 'Various Clients',
    period: '2019 - Present',
    description: 'Developing custom WordPress themes and plugins for small to medium businesses. Implementing e-commerce solutions with WooCommerce and optimizing existing websites.',
    highlights: ['Custom Theme Development', 'WooCommerce Integration', 'SEO Optimization', 'Site Maintenance'],
  },
  {
    title: 'Front-End Developer',
    company: 'SaaS & Marketing Teams',
    period: '2018 - 2020',
    description: 'Built high-conversion landing pages, UI components, and automated forms for SaaS products and marketing campaigns. Collaborated with design teams to implement pixel-perfect interfaces.',
    highlights: ['Landing Page Development', 'UI Component Libraries', 'Form Automation', 'A/B Testing Implementation'],
  },
  {
    title: 'Junior Web Developer',
    company: 'Agency Work',
    period: '2017 - 2018',
    description: 'Started my professional journey building responsive websites and learning modern development practices. Gained experience in client communication and project management.',
    highlights: ['HTML/CSS/JavaScript', 'Responsive Design', 'Cross-browser Compatibility', 'Version Control'],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Career Journey</span>
          <h2 className="section-title mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A track record of delivering impactful solutions across diverse projects and industries.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 hidden md:block glow-effect animate-pulse-glow" />

                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card p-6 md:p-8 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="text-primary" size={20} />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-1">{exp.title}</h3>
                    <p className="text-primary text-sm mb-4">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight) => (
                        <span key={highlight} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
