import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiMui,
  SiBootstrap,
  SiChakraui,
  SiSass,
  SiN8N,
  SiZapier,
  SiWhatsapp,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiPostgresql,
  SiFirebase,
  SiMysql,
  SiClaude,
  SiHuggingface,
  SiGoogleanalytics,
  SiGoogletagmanager,
  SiGooglesearchconsole,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiPostman,
  SiStrapi,
  SiWordpress,
  SiShopify,
  SiNpm,
  SiYarn,
} from "react-icons/si";
import type { SkillItem, SkillLogo } from "@/types/skills";
import type { Language } from "@/types/certificate";

const logos: Record<SkillLogo, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  mui: SiMui,
  bootstrap: SiBootstrap,
  chakra: SiChakraui,
  sass: SiSass,
  n8n: SiN8N,
  zapier: SiZapier,
  whatsapp: SiWhatsapp,
  node: SiNodedotjs,
  express: SiExpress,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  mysql: SiMysql,
  claude: SiClaude,
  huggingface: SiHuggingface,
  analytics: SiGoogleanalytics,
  gtm: SiGoogletagmanager,
  searchconsole: SiGooglesearchconsole,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  figma: SiFigma,
  postman: SiPostman,
  strapi: SiStrapi,
  wordpress: SiWordpress,
  shopify: SiShopify,
  npm: SiNpm,
  yarn: SiYarn,
};

export default function SkillChip({
  skill,
  language,
  primary,
}: {
  skill: SkillItem;
  language: Language;
  primary?: boolean;
}) {
  const Logo = skill.logo ? logos[skill.logo] : null;
  return (
    <li
      tabIndex={0}
      title={skill.detail}
      aria-label={skill.detail ?? skill.name}
      className={`inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-muted/35 text-foreground leading-snug transition-[border-color,box-shadow,background-color] duration-200 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_0_12px_hsl(var(--primary)/0.12)] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${primary ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-sm"}`}
    >
      {Logo && (
        <Logo
          size={16}
          className="shrink-0 text-foreground"
          role="img"
          aria-label={`${language === "es" ? "Logo de" : "Logo for"} ${skill.name}`}
          focusable="false"
        />
      )}
      <span>{skill.name}</span>
    </li>
  );
}
