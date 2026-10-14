import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Certificate, Language } from "@/types/certificate";
import { useEffect, useRef, useState } from "react";

export default function CertificateViewer({
  certificate,
  language,
  onClose,
}: {
  certificate: Certificate | null;
  language: Language;
  onClose: () => void;
}) {
  const text =
    language === "es"
      ? {
          open: "Abrir o descargar certificado",
          description: "Documento original del certificado",
        }
      : {
          open: "Open or download certificate",
          description: "Original certificate document",
        };
  const [ready, setReady] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    setReady(false);
  }, [certificate?.id]);
  const title = certificate
    ? language === "es"
      ? certificate.title_es
      : certificate.title_en
    : "";
  const url = certificate?.file_url;
  const image = url ? /\.(png|jpe?g)(?:\?|$)/i.test(url) : false;
  return (
    <Dialog
      open={Boolean(certificate)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        closeLabel={language === "es" ? "Cerrar" : "Close"}
        onOpenAutoFocus={() => {
          returnFocus.current = document.activeElement as HTMLElement;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus.current?.focus();
        }}
        className="max-w-5xl max-h-[95dvh] overflow-y-auto"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{text.description}</DialogDescription>
        {url && (
          <>
            {image ? (
              <img
                src={url}
                alt={title}
                className="w-full max-h-[65dvh] object-contain"
              />
            ) : (
              <iframe
                src={url}
                title={title}
                className="w-full h-[65dvh] rounded-lg bg-white"
                onLoad={() => setReady(true)}
              />
            )}
            {!image && !ready && (
              <p role="status">
                {language === "es"
                  ? "Cargando documento…"
                  : "Loading document…"}
              </p>
            )}
            <a
              className="btn-secondary w-fit"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text.open}
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
