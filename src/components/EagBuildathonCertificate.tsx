import {
  Award,
  Building2,
  CalendarDays,
  BadgeCheck,
  Blocks,
  Github,
  ExternalLink,
} from "lucide-react";
import { eagBuildathon } from "@/data/eag-buildathon";
import type { Certificate, Language } from "@/types/certificate";
import { useState } from "react";

export default function EagBuildathonCertificate({
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
          label: "Hackathon",
          view: "Ver certificado",
          project: "Ver proyecto",
          pending: "Imagen del certificado pendiente",
          credential: "ID de credencial",
          preview: "Certificado de X-Mate en la EAG Global Buildathon 2026",
        }
      : {
          label: "Hackathon",
          view: "View certificate",
          project: "View project",
          pending: "Certificate image coming soon",
          credential: "Credential ID",
          preview: "X-Mate certificate at the EAG Global Buildathon 2026",
        };
  return (
    <article
      data-eag-certificate
      className="overflow-hidden rounded-2xl border border-primary/30 bg-card md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="flex items-center justify-center min-h-[280px] aspect-[4/3] md:aspect-auto bg-gradient-to-br from-primary/15 via-muted to-background p-5 md:p-8">
        {certificate.thumbnail_url && !imageFailed ? (
          <img
            src={certificate.thumbnail_url}
            alt={text.preview}
            loading="lazy"
            decoding="async"
            width={900}
            height={675}
            onError={() => setImageFailed(true)}
            className="max-h-[520px] w-full object-contain rounded-lg"
          />
        ) : certificate.file_url ? (
          <iframe
            src={`${certificate.file_url}#page=1&toolbar=0&navpanes=0&view=FitH`}
            title={text.preview}
            loading="lazy"
            tabIndex={-1}
            className="w-full h-[320px] md:h-[440px] border-0 rounded-lg bg-white pointer-events-none"
          />
        ) : (
          <div className="text-center">
            <Award
              aria-hidden="true"
              className="w-16 h-16 text-primary mx-auto mb-5"
            />
            <p className="font-display text-2xl font-semibold">
              {eagBuildathon.title}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{text.pending}</p>
          </div>
        )}
      </div>
      <div className="min-w-0 p-6 md:p-8 lg:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary text-xs font-medium mb-5">
          <Award size={16} aria-hidden="true" />
          {text.label}
        </span>
        <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight">
          {eagBuildathon.title}
        </h3>
        <p className="mt-2 font-medium text-primary">
          {eagBuildathon.subtitle}
        </p>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          {eagBuildathon.description[language]}
        </p>
        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex gap-3">
            <dt>
              <Building2 size={18} aria-hidden="true" />
              <span className="sr-only">
                {language === "es" ? "Emisor" : "Issuer"}
              </span>
            </dt>
            <dd>{certificate.issuer}</dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <CalendarDays size={18} aria-hidden="true" />
              <span className="sr-only">
                {language === "es" ? "Fecha y evento" : "Date and event"}
              </span>
            </dt>
            <dd>{eagBuildathon.dates[language]}</dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <BadgeCheck size={18} aria-hidden="true" />
              <span className="sr-only">{text.credential}</span>
            </dt>
            <dd className="break-all">
              {text.credential}:{" "}
              {certificate.credential_id ?? eagBuildathon.credentialId}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <Blocks size={18} aria-hidden="true" />
              <span className="sr-only">Blockchain</span>
            </dt>
            <dd>{eagBuildathon.blockchain}</dd>
          </div>
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            className="btn-primary text-sm disabled:cursor-default"
            onClick={onView}
            disabled={!certificate.file_url}
          >
            <ExternalLink size={16} aria-hidden="true" />
            {text.view}
          </button>
          <a
            className="btn-secondary text-sm"
            href={eagBuildathon.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} aria-hidden="true" />
            {text.project}
          </a>
        </div>
      </div>
    </article>
  );
}
