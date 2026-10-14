# Verificación

Se ejecutaron `npm run build`, `npm run lint` y `npm run typecheck` en cada fase aplicable. Las comprobaciones finales no tienen errores ni advertencias de ESLint.

## Chrome

Prueba pública: home, persistencia del idioma, 11 certificados del respaldo, filtros, búsqueda, modal PDF, cierre con Escape, panel sin configuración, menú y ancho móvil.

Prueba del panel con API Supabase simulada: envío de magic link sin crear usuarios, sesión del propietario, listado, miniatura de un PDF local real, carga de documento y miniatura, creación, edición, destacado, borrado y limpieza de Storage. También comprueba que otra cuenta no pueda abrir el editor, el respaldo público ante un error y la colección vacía sin sustituirla por datos de ejemplo.

Estas pruebas no demuestran el comportamiento de Auth, Storage o RLS en un proyecto Supabase real. La migración aún debe aplicarse y probarse con sesiones de propietario, otro usuario y visitante anónimo.

## Lighthouse local · 14 de octubre de 2026

Auditoría móvil con Lighthouse 13.5.0, sobre el build de producción local y el respaldo de certificados, sin variables Supabase. [Resultados registrados](lighthouse-scores.json).

| Página | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 97 | 100 | 100 | 100 |
| Certificados | 97 | 100 | 100 | 100 |

## Repetir las pruebas

Necesitas Chrome y Node.js 22 o superior. Usa un perfil de Chrome exclusivo para estas pruebas; no conectes el depurador a tu perfil habitual. Inicia Chrome en modo headless con puerto de depuración `9223` y un directorio temporal para `--user-data-dir`. Inicia `npm run preview -- --host 127.0.0.1` en otra terminal; las pruebas esperan `http://127.0.0.1:4173`.

- `npm run qa:browser`: espera un build sin variables Supabase. Genera una captura local `.qa-certifications.png`.
- `npm run qa:admin`: espera un build con `VITE_SUPABASE_URL=https://example.supabase.co` y `VITE_SUPABASE_ANON_KEY=example-anon-key`. Intercepta las peticiones a ese host y usa sesiones ficticias; no escribe en un backend real.

Después de la prueba admin, reconstruye con tu configuración normal. Cierra la sesión de Chrome y el servidor de preview que abriste.

Ejemplo de auditoría, con el preview iniciado:

```sh
npx lighthouse http://127.0.0.1:4173/ --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
```

Las puntuaciones locales son una referencia, no una garantía sobre Vercel. Repite la auditoría tras configurar el backend y desplegar.
