import { errorMessage } from "@/lib/errors";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import {
  makeThumbnail,
  removeCertificateFiles,
  uploadCertificateFile,
  validateCertificateFile,
} from "@/lib/certificate-files";
import type { Certificate, Language } from "@/types/certificate";

const makeSchema = (language: Language) => {
  const text =
    language === "es"
      ? {
          required: "Este campo es obligatorio",
          url: "Introduce una URL válida con HTTPS",
          date: "Introduce una fecha válida",
          long: "Texto demasiado largo",
          order: "Introduce un entero mayor o igual a cero",
        }
      : {
          required: "This field is required",
          url: "Enter a valid HTTPS URL",
          date: "Enter a valid date",
          long: "Text is too long",
          order: "Enter a non-negative integer",
        };
  const optionalUrl = z
    .string()
    .trim()
    .refine((value) => !value || /^https:\/\//.test(value), text.url)
    .refine(
      (value) => !value || z.string().url().safeParse(value).success,
      text.url,
    );
  return z.object({
    title_es: z.string().trim().min(1, text.required).max(200, text.long),
    title_en: z.string().trim().min(1, text.required).max(200, text.long),
    issuer: z.string().trim().min(1, text.required).max(200, text.long),
    category: z.enum(["hackathon", "course", "certification", "award"]),
    issued_at: z
      .string()
      .refine(
        (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
        text.date,
      ),
    credential_id: z.string().trim().max(200, text.long),
    verify_url: optionalUrl,
    file_url: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value ||
          value.startsWith("/images/") ||
          (z.string().url().safeParse(value).success &&
            value.startsWith("https://")),
        text.url,
      ),
    thumbnail_url: optionalUrl,
    skills: z.string().max(2000, text.long),
    description_es: z.string().max(5000, text.long),
    description_en: z.string().max(5000, text.long),
    featured: z.boolean(),
    sort_order: z.coerce.number().int(text.order).min(0, text.order),
  });
};
type Values = z.infer<ReturnType<typeof makeSchema>>;
const empty: Values = {
  title_es: "",
  title_en: "",
  issuer: "",
  category: "course",
  issued_at: "",
  credential_id: "",
  verify_url: "",
  file_url: "",
  thumbnail_url: "",
  skills: "",
  description_es: "",
  description_en: "",
  featured: false,
  sort_order: 0,
};

export default function CertificateEditor({
  certificate,
  language,
  onSaved,
  onCancel,
  onBusyChange,
}: {
  certificate: Certificate | null;
  language: Language;
  onSaved: () => void;
  onCancel: () => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const text =
    language === "es"
      ? {
          title: "Título en español",
          english: "Título en inglés",
          issuer: "Emisor",
          category: "Categoría",
          date: "Fecha de emisión",
          credential: "ID de credencial",
          verify: "Enlace de verificación",
          file: "URL del certificado",
          thumbnail: "URL de miniatura",
          skills: "Skills (separadas por comas)",
          description: "Descripción en español",
          englishDescription: "Descripción en inglés",
          featured: "Destacado",
          order: "Orden (para fechas iguales)",
          upload:
            "Arrastra un PDF, PNG o JPG aquí o selecciona un archivo (máximo 20 MB)",
          save: "Guardar",
          cancel: "Cancelar",
          busy: "Procesando…",
          success: "Certificado guardado",
          failed: "No se pudo guardar",
          required: "Selecciona un archivo o introduce su URL",
          metadata: "Identificador y fecha de creación",
          preview: "Vista previa del certificado",
          missing:
            "Documento pendiente: puedes guardar los datos y añadirlo después",
        }
      : {
          title: "Spanish title",
          english: "English title",
          issuer: "Issuer",
          category: "Category",
          date: "Issue date",
          credential: "Credential ID",
          verify: "Verification URL",
          file: "Certificate URL",
          thumbnail: "Thumbnail URL",
          skills: "Skills (comma separated)",
          description: "Spanish description",
          englishDescription: "English description",
          featured: "Featured",
          order: "Order (for equal dates)",
          upload:
            "Drop a PDF, PNG or JPG here or select a file (maximum 20 MB)",
          save: "Save",
          cancel: "Cancel",
          busy: "Processing…",
          success: "Certificate saved",
          failed: "Could not save",
          required: "Choose a file or enter its URL",
          metadata: "Identifier and creation date",
          preview: "Certificate preview",
          missing: "Document pending: save the metadata and add it later",
        };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(makeSchema(language)),
    defaultValues: empty,
  });
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const version = useRef(0);
  useEffect(() => {
    onBusyChange(busy);
  }, [busy, onBusyChange]);
  useEffect(
    () => () => {
      version.current++;
      onBusyChange(false);
    },
    [onBusyChange],
  );
  useEffect(() => {
    reset(
      certificate
        ? {
            ...empty,
            ...certificate,
            issued_at: certificate.issued_at ?? "",
            credential_id: certificate.credential_id ?? "",
            verify_url: certificate.verify_url ?? "",
            file_url: certificate.file_url ?? "",
            thumbnail_url: certificate.thumbnail_url ?? "",
            skills: certificate.skills.join(", "),
            description_es: certificate.description_es ?? "",
            description_en: certificate.description_en ?? "",
          }
        : empty,
    );
    version.current++;
    setFile(null);
    setThumbnail(null);
    setPreview("");
  }, [certificate, reset]);
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  async function selectFile(selected?: File) {
    if (!selected) return;
    const attempt = ++version.current;
    setBusy(true);
    setFile(null);
    setThumbnail(null);
    setPreview("");
    try {
      validateCertificateFile(selected);
      const blob = await makeThumbnail(selected);
      if (attempt !== version.current) return;
      setFile(selected);
      setThumbnail(blob);
      setPreview(URL.createObjectURL(blob));
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      if (attempt === version.current) setBusy(false);
    }
  }
  async function save(values: Values) {
    if (!supabase || busy) return;
    setBusy(true);
    let uploaded: Awaited<ReturnType<typeof uploadCertificateFile>> | undefined;
    let saved = false;
    try {
      if (file && thumbnail)
        uploaded = await uploadCertificateFile(file, thumbnail);
      const row = {
        ...values,
        issued_at: values.issued_at || null,
        credential_id: values.credential_id || null,
        verify_url: values.verify_url || null,
        file_url: uploaded?.file_url ?? (values.file_url || null),
        thumbnail_url:
          uploaded?.thumbnail_url ?? (values.thumbnail_url || null),
        skills: [
          ...new Set(
            values.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          ),
        ],
        description_es: values.description_es || null,
        description_en: values.description_en || null,
      };
      const { error } = certificate
        ? await supabase
            .from("certificates")
            .update(row)
            .eq("id", certificate.id)
        : await supabase.from("certificates").insert(row);
      if (error) throw error;
      saved = true;
      if (certificate) {
        try {
          await removeCertificateFiles([
            certificate.file_url !== row.file_url ? certificate.file_url : null,
            certificate.thumbnail_url !== row.thumbnail_url
              ? certificate.thumbnail_url
              : null,
          ]);
        } catch {
          toast.error(
            language === "es"
              ? "Guardado; no se pudieron limpiar los archivos anteriores"
              : "Saved; previous files could not be cleaned up",
          );
        }
      }
      toast.success(text.success);
      onSaved();
    } catch (error) {
      if (uploaded && !saved) {
        try {
          await removeCertificateFiles([
            uploaded.file_url,
            uploaded.thumbnail_url,
          ]);
        } catch {
          /* Keep original save error. */
        }
      }
      toast.error(`${text.failed}: ${errorMessage(error)}`);
    } finally {
      setBusy(false);
    }
  }
  const fields: { name: keyof Values; label: string; type?: string }[] = [
    { name: "title_es", label: text.title },
    { name: "title_en", label: text.english },
    { name: "issuer", label: text.issuer },
    { name: "issued_at", label: text.date, type: "date" },
    { name: "credential_id", label: text.credential },
    { name: "verify_url", label: text.verify },
    { name: "file_url", label: text.file },
    { name: "thumbnail_url", label: text.thumbnail },
    { name: "skills", label: text.skills },
    { name: "sort_order", label: text.order, type: "number" },
  ];
  return (
    <form
      onSubmit={handleSubmit(save)}
      className="glass-card p-6 space-y-5"
      aria-busy={busy}
    >
      {certificate && (
        <p className="text-sm break-all">
          {text.metadata}: {certificate.id} ·{" "}
          {new Date(certificate.created_at).toLocaleString(language)}
        </p>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <label key={field.name} className="grid gap-2">
            {field.label}
            <input
              className="admin-input"
              type={field.type ?? "text"}
              {...register(field.name)}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `error-${field.name}` : undefined
              }
            />
            {errors[field.name] && (
              <span
                id={`error-${field.name}`}
                className="text-destructive text-sm"
              >
                {errors[field.name]?.message}
              </span>
            )}
          </label>
        ))}
      </div>
      <label className="grid gap-2">
        {text.category}
        <select className="admin-input" {...register("category")}>
          <option value="hackathon">Hackathon</option>
          <option value="course">
            {language === "es" ? "Curso" : "Course"}
          </option>
          <option value="certification">
            {language === "es" ? "Certificación" : "Certification"}
          </option>
          <option value="award">
            {language === "es" ? "Premio" : "Award"}
          </option>
        </select>
      </label>
      {(["description_es", "description_en"] as const).map((field, i) => (
        <label className="grid gap-2" key={field}>
          {i ? text.englishDescription : text.description}
          <textarea className="admin-input" rows={4} {...register(field)} />
          {errors[field] && (
            <span className="text-destructive">{errors[field].message}</span>
          )}
        </label>
      ))}
      <label className="flex gap-2 items-center">
        <input type="checkbox" {...register("featured")} />
        {text.featured}
      </label>
      <label
        className="block border-2 border-dashed border-primary rounded-xl p-6 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!busy) void selectFile(e.dataTransfer.files[0]);
        }}
      >
        {text.upload}
        <input
          className="block mt-4 max-w-full"
          type="file"
          accept="application/pdf,image/png,image/jpeg"
          disabled={busy}
          onChange={(e) => void selectFile(e.target.files?.[0])}
        />
      </label>
      <p className="text-sm text-muted-foreground">{text.missing}</p>
      {(preview || certificate?.thumbnail_url) && (
        <img
          src={preview || certificate?.thumbnail_url || ""}
          alt={text.preview}
          className="max-h-64 rounded-lg"
        />
      )}
      <div className="flex gap-3">
        <button className="btn-primary" disabled={busy} type="submit">
          {busy ? text.busy : text.save}
        </button>
        <button
          className="btn-secondary"
          disabled={busy}
          type="button"
          onClick={onCancel}
        >
          {text.cancel}
        </button>
      </div>
    </form>
  );
}
