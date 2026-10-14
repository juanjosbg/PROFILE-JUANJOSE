export type SkillLogo =
  | "react"
  | "typescript"
  | "javascript"
  | "nextjs"
  | "tailwind"
  | "html"
  | "css"
  | "mui"
  | "bootstrap"
  | "chakra"
  | "sass"
  | "n8n"
  | "zapier"
  | "whatsapp"
  | "node"
  | "express"
  | "supabase"
  | "postgresql"
  | "firebase"
  | "mysql"
  | "claude"
  | "huggingface"
  | "analytics"
  | "gtm"
  | "searchconsole"
  | "git"
  | "github"
  | "vercel"
  | "figma"
  | "postman"
  | "strapi"
  | "wordpress"
  | "shopify"
  | "npm"
  | "yarn";
export type SkillCategoryId =
  "frontend" | "automation" | "backend" | "ai" | "marketing" | "tools";
export interface SkillItem {
  name: string;
  logo?: SkillLogo;
  detail?: string;
}
export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  description: string;
  primary?: boolean;
  learning?: boolean;
  skills: SkillItem[];
}
