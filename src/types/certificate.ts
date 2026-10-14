export type Language = "es" | "en";
export type CertificateCategory =
  "hackathon" | "course" | "certification" | "award";
export interface Certificate {
  id: string;
  created_at: string;
  title_es: string;
  title_en: string;
  issuer: string;
  category: CertificateCategory;
  issued_at: string | null;
  credential_id: string | null;
  verify_url: string | null;
  file_url: string | null;
  thumbnail_url: string | null;
  skills: string[];
  description_es: string | null;
  description_en: string | null;
  featured: boolean;
  sort_order: number;
}
export type CertificateInput = Omit<Certificate, "id" | "created_at">;
