import { projects } from "@/data/projects";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

type Language = "es" | "en";

interface ProjectsProps {
  language: Language;
}

const PhoneMockup = ({ image, title }: { image: string; title: string }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="phone-mockup w-48 md:w-56 mx-auto">
      <div className="phone-mockup-screen">
        {image && !failed ? (
          <img
            src={image}
            alt={`Screenshot · ${title}`}
            loading="lazy"
            decoding="async"
            width={224}
            height={460}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full min-h-96 bg-gradient-to-br from-primary/20 via-muted to-background flex items-center justify-center p-6 text-center font-display text-xl">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = ({ language }: ProjectsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const descriptionLimit = 170;
  const expandableProjects = new Set([
    "X-Mate",
    "Gym Ecommerce Hub",
    "Loki Ecommerce",
  ]);

  const text =
    language === "es"
      ? {
          label: "Portafolio",
          title: "Proyectos Destacados",
          subtitle: "Selección de proyectos reales en los que he trabajado",
          otherProjects: "Otros Proyectos",
          readMore: "Leer más",
          readLess: "Leer menos",
          demo: "Ver demo",
          repo: "Repositorio",
          unavailable: "Repositorio privado",
          code: "Código",
          status: {
            active: "Activo",
            progress: "En desarrollo",
            building: "En construcción",
          },
        }
      : {
          label: "Portfolio",
          title: "Featured Projects",
          subtitle: "A selection of real projects I have worked on",
          otherProjects: "Other Projects",
          readMore: "Read more",
          readLess: "Read less",
          demo: "View demo",
          repo: "Repository",
          unavailable: "Private repository",
          code: "Code",
          status: {
            active: "Active",
            progress: "In progress",
            building: "Building",
          },
        };

  const toggleDescription = (title: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const getDescriptionPreview = (textValue: string) => {
    if (textValue.length <= descriptionLimit) {
      return textValue;
    }
    return `${textValue.slice(0, descriptionLimit).trim()}...`;
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32" ref={ref}>
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

        <div className="space-y-20 mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              data-project={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex flex-col ${Math.max(0, index - Number(featuredProjects[0]?.title === "X-Mate")) % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
            >
              <motion.div
                className="flex-shrink-0"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <PhoneMockup image={project.image} title={project.title} />
              </motion.div>

              <div className="flex-1 glass-card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display font-bold text-2xl md:text-3xl">
                    {project.title}
                  </h3>
                  <span
                    className={`badge-status ${
                      project.status === "active"
                        ? "badge-status-active"
                        : "badge-status-progress"
                    }`}
                  >
                    {text.status[project.status]}
                  </span>
                </div>

                {project.award && (
                  <Link
                    to={project.awardUrl ?? "/certifications"}
                    className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium"
                  >
                    <Award size={16} aria-hidden="true" />
                    {project.award[language]}
                  </Link>
                )}
                <p className="text-muted-foreground mb-2 leading-relaxed text-lg">
                  {expandableProjects.has(project.title) &&
                  !expandedDescriptions[project.title]
                    ? getDescriptionPreview(project.description[language])
                    : project.description[language]}
                </p>
                {expandableProjects.has(project.title) &&
                  project.description[language].length > descriptionLimit && (
                    <button
                      type="button"
                      onClick={() => toggleDescription(project.title)}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-6"
                      aria-expanded={
                        expandedDescriptions[project.title] ?? false
                      }
                    >
                      {expandedDescriptions[project.title]
                        ? text.readLess
                        : text.readMore}
                    </button>
                  )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="skill-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <ExternalLink size={16} />
                      {text.demo}
                    </a>
                  )}
                  {project.repositoryStatus === "private" ? (
                    <span className="text-sm text-muted-foreground">
                      {text.unavailable}
                    </span>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm"
                    >
                      <Github size={16} />
                      {text.repo}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display font-semibold text-xl mb-8 text-center">
            {text.otherProjects}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="project-card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-display font-semibold text-lg">
                    {project.title}
                  </h4>
                  <span
                    className={`badge-status ${
                      project.status === "active"
                        ? "badge-status-active"
                        : "badge-status-progress"
                    }`}
                  >
                    {text.status[project.status]}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
                  {project.description[language]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-lg bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  )}
                  {project.repositoryStatus === "private" ? (
                    <span className="text-sm text-muted-foreground">
                      {text.unavailable}
                    </span>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Github size={14} />
                      {text.code}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
