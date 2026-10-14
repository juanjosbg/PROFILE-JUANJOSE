import type { Project } from "../types/projects";
export const projects: Project[] = [
  {
    title: "Loki Ecommerce",
    description: {
      es: "E-commerce para marca de moda con autenticación OTP, pagos vía API e inventario por SKU en Supabase. Incluye una capa completa de crecimiento digital con SEO técnico, Google Tag Manager, Google Analytics 4 y Google Search Console, además de automatizaciones con n8n e integración de reels en tiempo real desde Instagram.",
      en: "E-commerce for a fashion brand with OTP authentication, API-based payments, and SKU-level inventory in Supabase. It includes a full digital growth layer with technical SEO, Google Tag Manager, Google Analytics 4, and Google Search Console, plus n8n automations and a real-time Instagram reels integration.",
    },
    tech: [
      "React",
      "TypeScript",
      "Supabase",
      "Node.js",
      "Vercel",
      "Technical SEO",
      "GA4",
      "GTM",
      "GSC",
      "n8n",
      "Instagram Reels API",
    ],
    image: "/images/lOKI.png",
    liveUrl: "https://www.thelokistore.com/",
    githubUrl: "https://github.com/juanjosbg/Loki-Ecommerce",
    // TODO: confirm the public repository URL or its access policy.
    repositoryStatus: "pending",
    status: "building",
    featured: true,
  },
  {
    title: "Gym Ecommerce Hub",
    description: {
      es: "Tienda fitness para México con panel admin, analítica de ventas, control de inventario y automatizaciones para agendamiento, mensajes y leads.",
      en: "Fitness e-commerce for México with admin panel, sales analytics, inventory control, and automations for scheduling, messaging, and leads.",
    },
    tech: ["React", "TypeScript", "Supabase", "n8n"],
    image: "/images/Fitmex.png",
    liveUrl: "https://gym-ecommerce-hub.vercel.app/",
    githubUrl: "https://github.com/juanjosbg/gymEcommerce-hub",
    status: "active",
    featured: true,
  },
  {
    title: "GP3Digital Web",
    description: {
      es: "Sitio corporativo para agencia de marketing digital con proceso de migración y actualizaciones técnicas continuas. Se mejoró el SEO técnico, la medición con Google Tag Manager y Google Analytics, y actualmente se integra n8n para automatizar flujos de captación y seguimiento.",
      en: "Corporate website for a digital marketing agency with an ongoing migration and technical updates. Technical SEO was improved, measurement was optimized through Google Tag Manager and Google Analytics, and n8n is being integrated to automate lead capture and follow-up workflows.",
    },
    tech: [
      "React",
      "TailwindCSS",
      "Vercel",
      "Strapi",
      "Technical SEO",
      "GTM",
      "GA4",
      "n8n",
    ],
    image: "/images/Gp3.png",
    liveUrl: "https://gp3-app.vercel.app/",
    githubUrl: "https://github.com/Gp3Marketing/Gp3App",
    repositoryStatus: "pending",
    status: "active",
    featured: true,
  },
  {
    title: "CIMELCO",
    description: {
      es: "Rediseño y migración del sitio de una empresa de servicios eléctricos hacia una plataforma dinámica en React, incorporando un blog administrable con Strapi. Se optimizó la analítica digital y se fortaleció la estrategia de SEO y SEM para mejorar el posicionamiento y la captación de tráfico calificado.",
      en: "Redesign and migration of an electrical services company website into a dynamic React platform, including a Strapi-powered blog management section. Digital analytics were enhanced, and SEO/SEM strategy was strengthened to improve search positioning and qualified traffic acquisition.",
    },
    tech: ["React", "Strapi", "SEO", "SEM", "Analytics", "Netlify"],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=800&fit=crop",
    liveUrl: "https://deploybranch--cimelco.netlify.app/",
    githubUrl: "https://github.com/juanjosbg/CIMELCO",
    repositoryStatus: "pending",
    status: "active",
    featured: false,
  },
  {
    title: "Chatbot App",
    description: {
      es: "Chatbot construido con React y OpenAI API, con conversaciones en tiempo real y registro de interacciones en Firebase Firestore.",
      en: "Chatbot built with React and the OpenAI API, with real-time conversations and interaction history in Firebase Firestore.",
    },
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "OpenAI API",
      "Firebase",
      "Tailwind CSS",
      "n8n",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=800&fit=crop",
    liveUrl: null, // TODO: add a confirmed public demo.
    githubUrl: "https://github.com/juanjosbg/Chatbot-app",
    status: "progress",
    featured: false,
  },
];
