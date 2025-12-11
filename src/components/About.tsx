import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Globe, Zap, Users } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code',
  },
  {
    icon: Globe,
    title: 'Web Performance',
    description: 'Optimizing for speed, SEO, and user experience',
  },
  {
    icon: Zap,
    title: 'Modern Stack',
    description: 'React, Next.js, TypeScript, TailwindCSS, and more',
  },
  {
    icon: Users,
    title: 'User-Centered',
    description: 'Building interfaces that users love to interact with',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium mb-4 block">About Me</span>
            <h2 className="section-title mb-6">
              Crafting Digital Experiences{' '}
              <span className="gradient-text">That Matter</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Front-End and WordPress Developer focused on building fast, 
                user-centered, and scalable digital experiences. With a strong foundation in 
                modern web technologies, I transform complex problems into elegant solutions.
              </p>
              <p>
                I have extensive experience working with HTML, CSS, JavaScript, React, PHP, 
                WordPress, TailwindCSS, Next.js, automation tools, CRM integrations, API connections, 
                and UX/UI optimization.
              </p>
              <p>
                I'm fluent in both <strong className="text-foreground">English</strong> and{' '}
                <strong className="text-foreground">Spanish</strong>, enabling me to collaborate 
                effectively with international teams and clients.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <span className="text-3xl md:text-4xl font-display font-bold gradient-text">5+</span>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-display font-bold gradient-text">50+</span>
                <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-display font-bold gradient-text">30+</span>
                <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
