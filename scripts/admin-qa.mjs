import assert from "node:assert/strict";
import { localCertificates } from "../src/data/certificates.ts";
const [tab] = await (await fetch("http://127.0.0.1:9223/json")).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let sequence = 0;
const requests = new Map();
const errors = [];
const mutations = [];
let failRead = false;
let emptyRead = false;
const rows = structuredClone(localCertificates);
const user = {
  id: "11111111-1111-4111-8111-111111111111",
  aud: "authenticated",
  role: "authenticated",
  email: "juanjoseborrero95@gmail.com",
  app_metadata: { provider: "email" },
  user_metadata: {},
  created_at: new Date().toISOString(),
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    requests.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function waitFor(expression) {
  for (let i = 0; i < 200; i++) {
    if (await evaluate(expression)) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("Timed out: " + expression);
}
ws.addEventListener("message", async (event) => {
  const data = JSON.parse(event.data);
  if (data.id) {
    const item = requests.get(data.id);
    requests.delete(data.id);
    data.error ? item.reject(data.error) : item.resolve(data.result);
  } else if (data.method === "Runtime.exceptionThrown")
    errors.push(data.params.exceptionDetails.text);
  else if (data.method === "Fetch.requestPaused") {
    const { request, requestId } = data.params;
    const url = new URL(request.url);
    let body = {};
    if (request.postData) {
      try {
        body = JSON.parse(request.postData);
      } catch {}
    }
    let response = {};
    let status = 200;
    if (request.method === "OPTIONS") response = {};
    else if (url.pathname === "/auth/v1/otp") {
      mutations.push({ type: "otp", body });
      response = {};
    } else if (url.pathname === "/auth/v1/user") response = user;
    else if (url.pathname === "/rest/v1/certificates") {
      if (request.method === "GET") {
        response = emptyRead ? [] : rows;
        if (failRead) {
          status = 503;
          response = { message: "Mock backend unavailable" };
        }
      } else if (request.method === "POST") {
        const row = {
          ...body,
          id: "22222222-2222-4222-8222-222222222222",
          created_at: new Date().toISOString(),
        };
        rows.push(row);
        mutations.push({ type: "insert", body });
        response = null;
        status = 201;
      } else if (request.method === "PATCH") {
        const id = url.searchParams.get("id").slice(3);
        Object.assign(
          rows.find((r) => r.id === id),
          body,
        );
        mutations.push({ type: "update", body });
        response = null;
        status = 204;
      } else if (request.method === "DELETE") {
        const id = url.searchParams.get("id").slice(3);
        rows.splice(
          rows.findIndex((r) => r.id === id),
          1,
        );
        mutations.push({ type: "delete" });
        response = null;
        status = 204;
      }
    } else if (url.pathname.startsWith("/storage/v1/object/")) {
      mutations.push({
        type: "storage",
        method: request.method,
        url: request.url,
        body,
      });
      response =
        request.method === "DELETE"
          ? []
          : { Key: url.pathname.split("/storage/v1/object/")[1] };
    }
    await send("Fetch.fulfillRequest", {
      requestId,
      responseCode: status,
      responseHeaders: [
        { name: "Content-Type", value: "application/json" },
        { name: "Access-Control-Allow-Origin", value: "*" },
        { name: "Access-Control-Allow-Headers", value: "*" },
        {
          name: "Access-Control-Allow-Methods",
          value: "GET, POST, PATCH, DELETE, OPTIONS",
        },
      ],
      body: Buffer.from(
        response === null ? "" : JSON.stringify(response),
      ).toString("base64"),
    });
  }
});
await send("Runtime.enable");
await send("Page.enable");
await send("Fetch.enable", {
  patterns: [{ urlPattern: "https://example.supabase.co/*" }],
});
const base = "http://127.0.0.1:4173";
await send("Page.navigate", { url: base + "/admin" });
await waitFor(`!!document.querySelector('form input[type="email"]')`);
await evaluate(`document.querySelector('form button').click()`);
await waitFor(`document.body.textContent.includes('Revisa tu correo')`);
assert.equal(mutations.find((m) => m.type === "otp").body.create_user, false);
const session = {
  access_token: `${Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")}.${Buffer.from(JSON.stringify({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 3600, email: user.email, role: "authenticated" })).toString("base64url")}.test`,
  refresh_token: "mock-refresh-token",
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  expires_in: 3600,
  token_type: "bearer",
  user,
};
await evaluate(
  `localStorage.setItem('sb-example-auth-token',${JSON.stringify(JSON.stringify(session))}); location.reload();`,
);
await waitFor(`document.querySelectorAll('article').length===11`);
await evaluate(
  `[...document.querySelectorAll('button')].find(b=>b.textContent==='Nuevo certificado').click()`,
);
for (const [name, value] of Object.entries({
  title_es: "Prueba PDF",
  title_en: "PDF test",
  issuer: "QA",
  issued_at: "2026-10-14",
  credential_id: "QA-001",
  verify_url: "https://example.com/verify",
  skills: "React, IA",
  sort_order: "2",
}))
  await evaluate(
    `(()=>{const input=document.querySelector('input[name="${name}"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));})()`,
  );
const doc = await send("DOM.getDocument");
const input = await send("DOM.querySelector", {
  nodeId: doc.root.nodeId,
  selector: 'input[type="file"]',
});
await send("DOM.setFileInputFiles", {
  nodeId: input.nodeId,
  files: [
    process.cwd() + "\\public\\images\\Certificados\\diploma-backend.pdf",
  ],
});
await waitFor(
  `document.querySelector('form img')?.src.startsWith('blob:') && !document.querySelector('form button[type="submit"]').disabled`,
);
await evaluate(`document.querySelector('form button[type="submit"]').click()`);
await waitFor(`document.querySelectorAll('article').length===12`);
const inserted = mutations.find((m) => m.type === "insert");
assert.ok(inserted.body.file_url.endsWith(".pdf"));
assert.ok(inserted.body.thumbnail_url.endsWith("thumbnail.png"));
assert.deepEqual(inserted.body.skills, ["React", "IA"]);
assert.equal(
  mutations.filter((m) => m.type === "storage" && m.method === "POST").length,
  2,
);
await evaluate(
  `(()=>{const article=[...document.querySelectorAll('article')].find(a=>a.textContent.includes('Prueba PDF'));article.querySelector('input[type="checkbox"]').click();})()`,
);
await waitFor(
  `!!document.querySelector('article:last-child input[type="checkbox"]')?.checked`,
);
await evaluate(
  `(()=>{const article=[...document.querySelectorAll('article')].find(a=>a.textContent.includes('Prueba PDF'));[...article.querySelectorAll('button')].find(b=>b.textContent==='Editar').click();})()`,
);
await waitFor(
  `document.querySelector('input[name="title_es"]')?.value==='Prueba PDF'`,
);
await evaluate(
  `(()=>{const input=document.querySelector('input[name="title_es"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'Prueba editada');input.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('form button[type="submit"]').click();})()`,
);
await waitFor(
  `document.querySelectorAll('article').length===12 && document.body.textContent.includes('Prueba editada')`,
);
await evaluate(
  `(()=>{const a=[...document.querySelectorAll('article')].find(a=>a.textContent.includes('Prueba editada'));[...a.querySelectorAll('button')].find(b=>b.textContent==='Borrar').click();})()`,
);
await waitFor(`!!document.querySelector('[role="dialog"]')`);
await evaluate(
  `[...document.querySelectorAll('[role="dialog"] button')].find(b=>b.textContent==='Borrar').click()`,
);
await waitFor(
  `document.querySelectorAll('article').length===11 && !document.querySelector('[role="dialog"]')`,
);
assert.ok(mutations.some((m) => m.type === "delete"));
assert.ok(mutations.some((m) => m.type === "storage" && m.method === "DELETE"));
assert.deepEqual(errors, []);
const otherSession = {
  ...session,
  user: { ...user, email: "other@example.com" },
};
await evaluate(
  `localStorage.setItem('sb-example-auth-token',${JSON.stringify(JSON.stringify(otherSession))}); location.reload();`,
);
await waitFor(
  `document.body.textContent.includes('Tu cuenta no tiene acceso')`,
);
assert.equal(await evaluate(`document.querySelectorAll('article').length`), 0);
await evaluate(`localStorage.removeItem('sb-example-auth-token')`);
failRead = true;
await send("Page.navigate", { url: base + "/certifications" });
await waitFor(
  `document.body.textContent.includes('Mostramos el respaldo local') && document.querySelectorAll('article').length===11`,
);
failRead = false;
emptyRead = true;
await evaluate(
  `document.querySelectorAll('button').forEach(b=>{if(b.textContent==='Reintentar')b.click()})`,
);
await waitFor(
  `document.querySelectorAll('article').length===0 && document.body.textContent.includes('No hay certificados')`,
);
await send("Fetch.disable");
console.log(
  "PASS (mock Supabase): login, owner session, list, PDF thumbnail, file + thumbnail uploads, create, featured toggle, edit, delete and Storage cleanup.",
);
ws.close();
