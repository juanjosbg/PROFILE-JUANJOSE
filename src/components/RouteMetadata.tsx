import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Language } from "@/types/certificate";

export default function RouteMetadata({ language }: { language: Language }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const text =
      language === "es"
        ? {
            home: "Juan José Borrero | React + Inteligencia Artificial",
            certificates: "Certificaciones | Juan José Borrero",
            admin: "Administración | Juan José Borrero",
            description:
              "Desarrollador React y TypeScript en Cali, Colombia. Aplicaciones web, agentes de inteligencia artificial e integraciones para automatizar procesos.",
            certDescription:
              "Certificados, cursos y logros de Juan José Borrero en desarrollo web, React e inteligencia artificial.",
          }
        : {
            home: "Juan José Borrero | React + Artificial Intelligence",
            certificates: "Certifications | Juan José Borrero",
            admin: "Administration | Juan José Borrero",
            description:
              "React and TypeScript developer in Cali, Colombia. Web applications, AI agents and integrations to automate processes.",
            certDescription:
              "Certificates, courses and achievements by Juan José Borrero in web development, React and artificial intelligence.",
          };
    const title =
      pathname === "/certifications"
        ? text.certificates
        : pathname === "/admin"
          ? text.admin
          : text.home;
    const description =
      pathname === "/certifications" ? text.certDescription : text.description;
    document.title = title;
    document.documentElement.lang = language;
    const setMeta = (attribute: string, name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${name}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      element.content = content;
    };
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta(
      "name",
      "robots",
      pathname === "/admin" || !["/", "/certifications"].includes(pathname)
        ? "noindex, nofollow"
        : "index, follow",
    );
    const url = `https://profile-juanjose.vercel.app${pathname}`;
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", language === "es" ? "es_CO" : "en_US");
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = url;
  }, [pathname, language]);
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target belongs to a lazy route; wait for it to mount.
    const scroll = () => {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView();
        return true;
      }
      return false;
    };
    if (scroll()) return;
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    observer.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [pathname, hash]);
  return null;
}
