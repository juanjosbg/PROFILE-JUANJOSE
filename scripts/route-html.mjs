import { readFile, writeFile, mkdir } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
for (const route of ["certifications", "admin"]) {
  const title =
    route === "certifications"
      ? "Certificaciones | Juan José Borrero"
      : "Administración | Juan José Borrero";
  const description =
    route === "certifications"
      ? "Certificados, cursos y logros de Juan José Borrero en desarrollo web, React e inteligencia artificial."
      : "Panel privado de certificados de Juan José Borrero.";
  let result = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]+/g,
      `$1${title}`,
    )
    .replace(
      /(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]+/g,
      `$1${description}`,
    )
    .replace(
      /(content|href)="https:\/\/profile-juanjose.vercel.app\/"/g,
      `$1="https://profile-juanjose.vercel.app/${route}"`,
    );
  if (route === "admin")
    result = result.replace(
      'content="index, follow"',
      'content="noindex, nofollow"',
    );
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, result);
}
