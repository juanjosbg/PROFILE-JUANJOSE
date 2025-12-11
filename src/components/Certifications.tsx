import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    category: 'Front-End Development',
    items: [
      { name: 'Advanced CSS and Sass', issuer: 'Udemy', year: '2023' },
      { name: 'React - The Complete Guide', issuer: 'Udemy', year: '2023' },
      { name: 'Modern HTML & CSS', issuer: 'Coursera', year: '2022' },
    ],
  },
  {
    category: 'JavaScript & TypeScript',
    items: [
      { name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: '2023' },
      { name: 'TypeScript: The Complete Developer\'s Guide', issuer: 'Udemy', year: '2023' },
      { name: 'ES6+ JavaScript Course', issuer: 'Wes Bos', year: '2022' },
    ],
  },
  {
    category: 'WordPress Development',
    items: [
      { name: 'Complete WordPress Developer Course', issuer: 'Udemy', year: '2022' },
      { name: 'PHP for WordPress Development', issuer: 'LinkedIn Learning', year: '2022' },
      { name: 'Advanced Custom Fields PRO', issuer: 'ACF Academy', year: '2021' },
    ],
  },
  {
    category: 'React & Next.js',
    items: [
      { name: 'Next.js & React - The Complete Guide', issuer: 'Udemy', year: '2024' },
      { name: 'React Query / TanStack Query', issuer: 'UI.dev', year: '2023' },
      { name: 'Testing React with Jest', issuer: 'Pluralsight', year: '2023' },
    ],
  },
  {
    category: 'UX/UI & Design',
    items: [
      { name: 'UX Design Fundamentals', issuer: 'Google', year: '2023' },
      { name: 'UI Design with Figma', issuer: 'Coursera', year: '2022' },
      { name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2021' },
    ],
  },
  {
    category: 'Git, APIs & Automation',
    items: [
      { name: 'Git & GitHub Bootcamp', issuer: 'Udemy', year: '2022' },
      { name: 'REST API Design', issuer: 'LinkedIn Learning', year: '2023' },
      { name: 'n8n Workflow Automation', issuer: 'n8n Academy', year: '2024' },
    ],
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Continuous Learning</span>
          <h2 className="section-title mb-4">
            Certifications & <span className="gradient-text">Courses</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Committed to staying current with the latest technologies and best practices in web development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={20} />
                </div>
                <h3 className="font-display font-semibold">{category.category}</h3>
              </div>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.name} className="group">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.issuer} • {item.year}
                        </p>
                      </div>
                      <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
