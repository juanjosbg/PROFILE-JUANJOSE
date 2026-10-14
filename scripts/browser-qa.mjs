import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const [tab] = await (await fetch("http://127.0.0.1:9223/json")).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let sequence = 0;
const requests = new Map();
const errors = [];
ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (data.id) {
    const item = requests.get(data.id);
    requests.delete(data.id);
    data.error ? item.reject(data.error) : item.resolve(data.result);
  } else if (data.method === "Runtime.exceptionThrown")
    errors.push(data.params.exceptionDetails.text);
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    requests.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails)
    throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let i = 0; i < 80; i++) {
    if (await evaluate(expression)) return;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("Timed out: " + expression);
}
const base = "http://127.0.0.1:4173";
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: base });
await waitFor(`document.querySelector('h1')?.textContent.includes('React')`);
await evaluate(
  `localStorage.removeItem('portfolio-language');location.reload()`,
);
await waitFor(
  `document.documentElement.lang==='es' && !!document.querySelector('h1')`,
);
assert.equal(
  await evaluate(
    `document.querySelector('a[download]').getAttribute('aria-disabled')`,
  ),
  "true",
);
await evaluate(
  `document.querySelector('button[aria-label="ES: Cambiar a inglés"]').click()`,
);
await waitFor(`document.documentElement.lang==='en'`);
await send("Page.navigate", { url: base + "/certifications" });
await waitFor(`document.querySelectorAll('article').length===11`);
assert.equal(await evaluate(`document.documentElement.lang`), "en");
await evaluate(
  `document.querySelector('button[aria-label="EN: Switch to Spanish"]').click()`,
);
await waitFor(`document.documentElement.lang==='es'`);
await evaluate(
  `[...document.querySelectorAll('button')].find(b=>b.textContent==='Cursos').click()`,
);
await waitFor(`document.querySelectorAll('article').length===10`);
await evaluate(
  `(()=>{const input=document.querySelector('input[type="search"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'github');input.dispatchEvent(new Event('input',{bubbles:true}));})()`,
);
await waitFor(`document.querySelectorAll('article').length===1`);
assert.ok(
  await evaluate(
    `document.querySelector('article').textContent.includes('Git y GitHub')`,
  ),
);
await evaluate(
  `(()=>{const b=document.querySelector('article button');b.focus();b.click();})()`,
);
await waitFor(`!!document.querySelector('[role="dialog"] iframe')`);
await evaluate(`document.querySelector('[role="dialog"] button').focus()`);
await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await waitFor(`!document.querySelector('[role="dialog"]')`);
await send("Page.navigate", { url: base + "/admin" });
await waitFor(
  `document.querySelector('main')?.textContent.includes('Configura')`,
);
assert.equal(
  await evaluate(`document.querySelector('meta[name="robots"]').content`),
  "noindex, nofollow",
);
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Page.navigate", { url: base });
await waitFor(`!!document.querySelector('h1')`);
assert.ok(
  await evaluate(`document.documentElement.scrollWidth<=window.innerWidth`),
  "No horizontal overflow on mobile",
);
await evaluate(
  `document.querySelector('button[aria-controls="mobile-menu"]').click()`,
);
await waitFor(
  `document.querySelector('button[aria-controls="mobile-menu"]').getAttribute('aria-expanded')==='true'`,
);
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: base + "/certifications" });
await waitFor(`document.querySelectorAll('article').length===11`);
const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
});
await writeFile(
  ".qa-certifications.png",
  Buffer.from(screenshot.data, "base64"),
);
assert.deepEqual(errors, [], "No runtime exceptions");
console.log(
  "PASS: home, bilingual persistence, 11 certificates, filters, search, PDF modal, Escape, admin configuration state, mobile menu and layout.",
);
ws.close();
