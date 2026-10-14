import { supabase } from "./supabase";

export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export function validateCertificateFile(file: File) {
  if (!["application/pdf", "image/png", "image/jpeg"].includes(file.type))
    throw new Error("PDF, PNG o JPG / PDF, PNG or JPG");
  if (file.size > MAX_FILE_SIZE)
    throw new Error("Máximo 20 MB / Maximum 20 MB");
}
export async function makeThumbnail(file: File): Promise<Blob> {
  validateCertificateFile(file);
  if (file.type !== "application/pdf") return file;
  // pdf.js and its worker are requested only when a PDF is uploaded.
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const task = pdfjs.getDocument({
    data: new Uint8Array(await file.arrayBuffer()),
  });
  try {
    const document = await task.promise;
    const page = await document.getPage(1);
    const initial = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({
      scale: Math.min(1.5, 900 / initial.width),
    });
    const canvas = window.document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    await page.render({ canvas, canvasContext: context, viewport }).promise;
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob ? resolve(blob) : reject(new Error("Thumbnail failed")),
        "image/png",
      ),
    );
  } finally {
    await task.destroy();
  }
}
export async function uploadCertificateFile(file: File, thumbnail: Blob) {
  if (!supabase) throw new Error("Supabase unavailable");
  const folder = crypto.randomUUID();
  const extension =
    file.type === "application/pdf"
      ? "pdf"
      : file.type === "image/png"
        ? "png"
        : "jpg";
  const paths = [
    `${folder}/certificate.${extension}`,
    `${folder}/thumbnail.${thumbnail.type === "image/jpeg" ? "jpg" : "png"}`,
  ];
  const storage = supabase.storage.from("certificates");
  const uploaded: string[] = [];
  try {
    for (const [index, blob] of [file, thumbnail].entries()) {
      const { error } = await storage.upload(paths[index], blob, {
        contentType: blob.type,
      });
      if (error) throw error;
      uploaded.push(paths[index]);
    }
    return {
      file_url: storage.getPublicUrl(paths[0]).data.publicUrl,
      thumbnail_url: storage.getPublicUrl(paths[1]).data.publicUrl,
      paths,
    };
  } catch (error) {
    if (uploaded.length) await storage.remove(uploaded);
    throw error;
  }
}
export async function removeCertificateFiles(urls: (string | null)[]) {
  if (!supabase) return;
  const prefix = `${supabase.storage.from("certificates").getPublicUrl("").data.publicUrl}`;
  const paths = urls
    .filter((url): url is string => Boolean(url?.startsWith(prefix)))
    .map((url) => decodeURIComponent(url.slice(prefix.length)));
  if (paths.length) {
    const { error } = await supabase.storage.from("certificates").remove(paths);
    if (error) throw error;
  }
}
