# Juan José Borrero · React + IA

Portafolio bilingüe con Vite, React, TypeScript, Tailwind, Framer Motion y React Router. Certificados públicos con Supabase y TanStack Query; panel privado con Supabase Auth, React Hook Form, Zod y miniaturas PDF generadas con pdf.js.

## Desarrollo local

Requisitos: Node.js 22 o superior y npm. El lockfile de referencia es `package-lock.json`.

```sh
npm ci
npm run dev
```

El servidor de desarrollo usa el puerto 8080. Rutas: `/`, `/certifications` y `/admin`. El panel no aparece en la navegación pública.

```sh
npm run build
npm run lint
npm run typecheck
npm run preview
```

Sin configuración Supabase, las páginas públicas utilizan `src/data/certificates.ts` y el panel explica qué falta configurar. Un error de Supabase muestra el respaldo y un botón para reintentar. Una tabla vacía se muestra como vacía: ejecuta el seed para migrar el contenido.

## Configurar Supabase

1. Crea o selecciona un proyecto Supabase. Aplica `supabase/migrations/202610140001_certificates.sql` en el SQL Editor del dashboard, o ejecuta `supabase db push` después de vincular el proyecto con la CLI.
2. La migración crea la tabla `certificates`, el bucket público `certificates` y las políticas RLS. La lectura es pública; las escrituras requieren un JWT de Supabase con el email `juanjoseborrero95@gmail.com`. Las políticas de Storage aplican la misma restricción. Los archivos admitidos son PDF, PNG y JPG de hasta 20 MB.
3. En Authentication, crea el usuario propietario con ese email y confirma la cuenta. El panel envía magic links con `shouldCreateUser: false`; no crea usuarios desde el login. Deshabilita las altas públicas si el proyecto se usa solo para este panel.
4. En Authentication → URL Configuration, configura el Site URL del portafolio y permite `http://localhost:8080/admin` y `https://profile-juanjose.vercel.app/admin` como Redirect URLs. Añade la URL local de preview si la usas para probar Auth. Configura el proveedor de correo para enviar los enlaces en producción.
5. Copia `.env.example` a `.env` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con la URL y la clave pública anon del proyecto. Configura las mismas variables en Vercel y reconstruye el sitio.

Las variables `VITE_*` quedan en el navegador. Usa únicamente la clave pública con RLS; nunca una service role key. Los archivos `.env` y `.env.*` están ignorados por Git, con excepción del ejemplo vacío.

Documentación oficial: [magic links](https://supabase.com/docs/reference/javascript/auth-signinwithotp) y [políticas de Storage](https://supabase.com/docs/guides/storage/security/access-control).

## Migrar los certificados existentes

Configura temporalmente `SUPABASE_SERVICE_ROLE_KEY` en tu entorno local de migración o en `.env`. Esta clave se utiliza solo en el script Node y nunca lleva prefijo `VITE_`. Elimínala del entorno de trabajo cuando termines.

```sh
npm run seed:certificates
```

El script sube los 10 PDFs de `public/images/Certificados/` y crea el registro destacado de la hackathon. Si añades `public/images/Certificados/eag-buildathon-2026.png`, también sube esa imagen; puedes indicar otro PDF o imagen con `HACKATHON_FILE`. Si falta, se migran los datos de la hackathon sin un enlace roto; podrás añadir el documento en el panel.

Los IDs son estables. Los registros ya migrados se omiten al repetir el script, conservando tus ediciones. Las fechas de los cursos antiguos son desconocidas y quedan vacías; complétalas al revisar los certificados. El script de migración no genera miniaturas: al reemplazar o añadir un archivo desde el panel, se generará su vista previa.

## Subir un certificado desde /admin

1. Abre `/admin`, introduce tu email propietario y entra con el enlace que recibas.
2. Pulsa **Nuevo certificado**. Completa los títulos y descripciones en ambos idiomas, emisor, categoría, fecha, skills separadas por comas y los enlaces opcionales de verificación.
3. Arrastra un PDF, PNG o JPG al formulario, o selecciónalo con el control de archivos. El PDF genera una miniatura de su primera página en el navegador; revisa la vista previa.
4. Marca **Destacado** si corresponde y guarda. El documento y la miniatura se suben a Storage y el registro se guarda en Supabase. Los certificados también admiten URLs existentes; puedes guardar los datos y añadir un documento posteriormente.
5. Usa **Editar**, **Borrar**, **Destacado** y **Orden** en la lista. El orden público principal es la fecha descendente; el número de orden resuelve empates. Borrar requiere confirmación y elimina los archivos asociados cuando pertenecen al bucket.

La página pública se actualiza al guardar. Otras sesiones se refrescan al volver a la ventana o recargar, con una caché de un minuto. Los modales admiten navegación con teclado, Escape y restauración de foco; el visor PDF nativo puede capturar teclas mientras el foco esté dentro de él.

## Actualizar contenido

- Proyectos: `src/data/projects.ts`.
- Experiencia: `src/data/experience.ts`; completa los TODO de cargo y fechas de LOKI.
- Skills: `src/data/skills.ts`.
- Respaldo de certificados: `src/data/certificates.ts`.
- Tipos: `src/types/`.

Tech Stack usa una grilla de seis categorías (1 columna en móvil, 2 en tablet y 3 en escritorio), con chips de Simple Icons de `react-icons`, alturas según el contenido y una etiqueta de aprendizaje para IA. Los niveles por herramienta se eliminaron. Los certificados también usan una grilla; se retiró Embla al dejar de utilizarse.

El portafolio contiene **6 proyectos**, con **X-Mate como primer destacado**, y los **10 PDFs** de cursos. X-Mate incluye el sello de EAG Global Buildathon 2026 y un placeholder de teléfono; añade la captura en `public/images/xmate.png` y activa la ruta comentada en sus datos. El proyecto Chatbot tiene el stack corregido conforme a [su README público](https://github.com/juanjosbg/Chatbot-app); falta una demo pública confirmada.

Los repositorios de Loki-Ecommerce, Gp3App y CIMELCO son privados y sus tarjetas lo indican sin publicar enlaces de GitHub. Sus demos públicas son https://thelokistore.com/, https://gp3-app.vercel.app/ y https://www.cimelco.net/. Si publicas un repositorio, actualiza su URL y cambia `repositoryStatus` a `public`.

El botón del Hero descarga el CV correspondiente al idioma: `public/images/CV/CV-Juanjose-ES.pdf` o `public/images/CV/CV-Juanjose-EN.pdf`.

La sección de certificados usa `CertificateCard.tsx` en una grilla con búsqueda, filtros y visor. Las vistas previas de PDFs se cargan de forma diferida. La tarjeta destacada de EAG conserva los datos del NFT y el enlace a X-Mate; **Ver certificado** abre el documento oficial `public/images/Certificados/ETHCali-certificado-EAGCALI26-C449RLBS.pdf`. Opcionalmente puedes añadir `public/images/Certificados/eag-buildathon-2026.png` como miniatura; el documento que se abre sigue siendo el PDF.

## SEO y despliegue

`index.html` contiene Open Graph, Twitter cards, canonical y JSON-LD Person. La imagen social es `public/og-image.png` (1200 × 630); en Windows puedes regenerarla con `scripts/generate-og-image.ps1`. Se incluyen `sitemap.xml` y `robots.txt`; el panel lleva noindex.

El build genera HTML con metadatos específicos para certificados y administración. `vercel.json` resuelve las rutas directamente a esos archivos. Si cambia el dominio, actualiza metadatos, `RouteMetadata.tsx`, sitemap, robots y las URLs de Auth.

En Vercel usa **Vite**, el comando `npm run build` y el directorio `dist`. Configura las dos variables públicas de Supabase antes de desplegar. No necesitas exponer credenciales administrativas en Vercel.

Las rutas se cargan por separado, las imágenes tienen carga diferida y los logros del home se precargan al acercarse al viewport. pdf.js y su worker solo se solicitan al subir un PDF. El sitio respeta la preferencia de movimiento reducido y mantiene ambos temas e idiomas.

## Verificación

Consulta [las pruebas y cómo repetirlas](docs/verification.md). Build, lint y TypeScript pasan sin errores. Lighthouse móvil local: **97 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, tanto en home como en certificados, usando el respaldo sin Supabase configurado. El flujo admin se probó con API simulada y un PDF real; falta validar Auth/RLS/Storage contra tu proyecto Supabase y repetir Lighthouse en producción.
