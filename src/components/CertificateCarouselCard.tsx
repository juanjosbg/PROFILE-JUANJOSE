import { useState } from "react";
import { Award, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate, Language } from "@/types/certificate";

export default function CertificateCarouselCard({
  certificate,
  language,
  onView,
}: {
  certificate: Certificate;
  language: Language;
  onView: () => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const text =
    language === "es"
      ? {
          hackathon: "Hackathon",
          course: "Curso",
          certification: "Certificación",
          award: "Premio",
          view: "Ver certificado",
          verify: "Verificar",
          date: "Fecha pendiente",
          pending: "Documento pendiente",
          preview: "Vista previa de",
        }
      : {
          hackathon: "Hackathon",
          course: "Course",
          certification: "Certification",
          award: "Award",
          view: "View certificate",
          verify: "Verify",
          date: "Date pending",
          pending: "Document pending",
          preview: "Preview of",
        };
  const title = language === "es" ? certificate.title_es : certificate.title_en;
  return (
    <article className="group relative w-[280px] h-[460px] sm:w-[320px] sm:h-[520px] lg:w-[370px] lg:h-[580px] border border-border overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card motion-safe:hover:scale-[1.02] transition-transform duration-300">
      {certificate.thumbnail_url && !imageFailed ? (
        <img
          src={certificate.thumbnail_url}
          alt={`${text.preview} ${title}`}
          loading="lazy"
          decoding="async"
          width={740}
          height={1160}
          onError={() => setImageFailed(true)}
          className="absolute inset-0 w-full h-full object-contain opacity-35"
        />
      ) : (
        <Award
          aria-hidden="true"
          className="absolute bottom-24 right-8 h-40 w-40 text-primary/15"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-card via-card/90 to-primary/10"
      />
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
        <p className="text-sm font-medium text-primary">
          {text[certificate.category]}
        </p>
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{certificate.issuer}</p>
        {certificate.issued_at ? (
          <time
            className="text-sm text-muted-foreground"
            dateTime={certificate.issued_at}
          >
            {new Intl.DateTimeFormat(language === "es" ? "es-CO" : "en-US", {
              dateStyle: "long",
              timeZone: "UTC",
            }).format(new Date(`${certificate.issued_at}T00:00:00Z`))}
          </time>
        ) : (
          <p className="text-sm text-muted-foreground">{text.date}</p>
        )}
        <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-primary/20 bg-card/90 px-2.5 py-1 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 space-y-4">
        {certificate.verify_url && (
          <a
            href={certificate.verify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary"
          >
            <ExternalLink size={14} aria-hidden="true" />
            {text.verify}
          </a>
        )}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium">
            {certificate.file_url ? text.view : text.pending}
          </span>
          <Button
            size="icon"
            onClick={onView}
            disabled={!certificate.file_url}
            aria-label={`${text.view}: ${title}`}
            className="h-10 w-10 shrink-0 rounded-full disabled:cursor-default"
          >
            <ArrowUpRight
              className="h-4 w-4 motion-safe:group-hover:rotate-45 transition-transform duration-300"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </article>
  );
}
