import type { Language } from "../types/certificate";
import type { SkillCategory } from "../types/skills";
export const getSkillCategories = (language: Language): SkillCategory[] =>
  language === "es"
    ? [
        {
          title: "IA",
          skills: [
            { name: "OpenAI API", level: "intermediate" },
            { name: "Claude API", level: "intermediate" },
            { name: "Function calling", level: "intermediate" },
            { name: "Agentes de IA", level: "intermediate" },
            { name: "Hugging Face", level: "intermediate" },
            { name: "n8n", level: "advanced" },
          ],
        },
        {
          title: "Frontend",
          skills: [
            { name: "HTML5", level: "advanced" },
            { name: "JavaScript (ES6+)", level: "advanced" },
            { name: "TypeScript", level: "advanced" },
            { name: "React", level: "advanced" },
            { name: "Next.js", level: "advanced" },
            { name: "React Native", level: "intermediate" },
          ],
        },
        {
          title: "UI & Styling (UI Frameworks)",
          skills: [
            { name: "Material UI (MUI)", level: "advanced" },
            { name: "TailwindCSS", level: "advanced" },
            { name: "Bootstrap", level: "advanced" },
            { name: "Chakra UI", level: "advanced" },
            { name: "SCSS / Sass", level: "advanced" },
            { name: "CSS3", level: "advanced" },
          ],
        },
        {
          title: "Backend & CMS",
          skills: [
            {
              name: "WordPress (temas y plugins personalizados)",
              level: "advanced",
            },
            { name: "Node.js", level: "intermediate" },
            { name: "Strapi", level: "intermediate" },
            { name: "Firebase", level: "intermediate" },
            { name: "SQL / MySQL", level: "intermediate" },
          ],
        },
        {
          title: "Analítica, SEO y SEM",
          skills: [
            { name: "Google Analytics 4 (GA4)", level: "advanced" },
            { name: "Google Tag Manager (GTM)", level: "advanced" },
            { name: "Google Search Console (GSC)", level: "advanced" },
            { name: "SEO técnico", level: "advanced" },
            { name: "SEM", level: "advanced" },
            { name: "CRO", level: "advanced" },
            { name: "Core Web Vitals", level: "advanced" },
            { name: "Core Web Vitals / Performance", level: "advanced" },
          ],
        },
        {
          title: "Automatización y APIs",
          skills: [
            { name: "n8n", level: "advanced" },
            { name: "Zapier", level: "advanced" },
            { name: "API Integration", level: "advanced" },
            { name: "Formularios dinámicos", level: "advanced" },
            { name: "Automatización de procesos web", level: "advanced" },
          ],
        },
        {
          title: "Dev Tools e Infraestructura",
          skills: [
            { name: "Git / GitHub", level: "advanced" },
            { name: "npm", level: "advanced" },
            { name: "Yarn", level: "advanced" },
            { name: "AWS", level: "intermediate" },
            { name: "Figma", level: "advanced" },
          ],
        },
      ]
    : [
        {
          title: "AI",
          skills: [
            { name: "OpenAI API", level: "intermediate" },
            { name: "Claude API", level: "intermediate" },
            { name: "Function calling", level: "intermediate" },
            { name: "AI agents", level: "intermediate" },
            { name: "Hugging Face", level: "intermediate" },
            { name: "n8n", level: "advanced" },
          ],
        },
        {
          title: "Frontend",
          skills: [
            { name: "React", level: "advanced" },
            { name: "Next.js", level: "advanced" },
            { name: "TypeScript", level: "advanced" },
            { name: "JavaScript (ES6+)", level: "advanced" },
            { name: "React Native", level: "intermediate" },
            { name: "HTML5", level: "advanced" },
            { name: "CSS3", level: "advanced" },
          ],
        },
        {
          title: "Libraries and Styling",
          skills: [
            { name: "TailwindCSS", level: "advanced" },
            { name: "Bootstrap", level: "advanced" },
            { name: "SCSS", level: "advanced" },
          ],
        },
        {
          title: "Backend",
          skills: [
            {
              name: "WordPress (custom themes and plugins)",
              level: "advanced",
            },
            { name: "Node.js", level: "intermediate" },
            { name: "Strapi", level: "intermediate" },
            { name: "Firebase", level: "intermediate" },
            { name: "SQL / MySQL", level: "intermediate" },
          ],
        },
        {
          title: "Analytics, SEO and SEM",
          skills: [
            { name: "Google Analytics 4 (GA4)", level: "advanced" },
            { name: "Google Tag Manager (GTM)", level: "advanced" },
            { name: "Google Search Console (GSC)", level: "advanced" },
            { name: "Technical SEO", level: "advanced" },
            { name: "SEM", level: "advanced" },
            { name: "CRO", level: "advanced" },
            { name: "Core Web Vitals", level: "advanced" },
            { name: "Performance Optimization", level: "advanced" },
          ],
        },
        {
          title: "Automation and APIs",
          skills: [
            { name: "n8n", level: "advanced" },
            { name: "Zapier", level: "advanced" },
            { name: "API Integration", level: "advanced" },
            { name: "Dynamic forms", level: "advanced" },
            { name: "Web process automation", level: "advanced" },
          ],
        },
        {
          title: "Dev Tools and Infrastructure",
          skills: [
            { name: "Git / GitHub", level: "advanced" },
            { name: "npm", level: "advanced" },
            { name: "Yarn", level: "advanced" },
            { name: "AWS", level: "intermediate" },
            { name: "Figma", level: "advanced" },
          ],
        },
      ];
