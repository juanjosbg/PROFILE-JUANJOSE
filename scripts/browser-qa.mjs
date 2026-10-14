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
  await evaluate(`document.querySelector('a[download]').getAttribute('href')`),
  "/images/CV/CV-Juanjose-ES.pdf",
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
  width: 375,
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
// Check the requested responsive/theme/language combinations on real pages.
for (const width of [375, 1440]) {
  for (const theme of ["light", "dark"]) {
    for (const language of ["es", "en"]) {
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: width === 375,
      });
      await evaluate(
        `localStorage.setItem('portfolio-theme', ${JSON.stringify(theme)}); localStorage.setItem('portfolio-language', ${JSON.stringify(language)});`,
      );
      await send("Page.navigate", { url: base });
      await waitFor(
        `document.querySelector('#projects h3')?.textContent==='X-Mate' && document.documentElement.lang===${JSON.stringify(language)}`,
      );
      assert.equal(
        await evaluate(`document.documentElement.classList.contains('dark')`),
        theme === "dark",
      );
      assert.equal(
        await evaluate(
          `document.querySelector('a[download]').getAttribute('href')`,
        ),
        `/images/CV/CV-Juanjose-${language.toUpperCase()}.pdf`,
      );
      assert.ok(
        await evaluate(
          `!document.querySelector('[data-project="X-Mate"] img')`,
        ),
        "X-Mate uses the generic phone fallback",
      );
      assert.equal(
        await evaluate(
          `document.querySelector('[data-project="X-Mate"] a[href="/certifications"]').textContent.trim()`,
        ),
        "EAG Global Buildathon 2026",
      );
      assert.equal(
        await evaluate(
          `document.querySelector('[data-project="X-Mate"] a[target="_blank"]').getAttribute('href')`,
        ),
        "https://github.com/EmanuelDesarrollo/ethereum-app-transaction",
      );
      assert.equal(
        await evaluate(
          `document.querySelectorAll('[data-project="X-Mate"] a[target="_blank"]').length`,
        ),
        1,
        "Only the repository is linked; no demo",
      );
      await evaluate(`document.querySelector('#projects').scrollIntoView()`);
      await new Promise((resolve) => setTimeout(resolve, 900));
      await evaluate(
        `document.querySelector('[data-project="X-Mate"] button[aria-expanded]').click()`,
      );
      assert.ok(
        await evaluate(
          `document.querySelector('[data-project="X-Mate"]').textContent.includes(${JSON.stringify(language === "es" ? "Construida y entregada en 48 horas" : "Built and shipped in 48 hours")})`,
        ),
      );
      await evaluate(
        `document.querySelector('[data-project="X-Mate"] button[aria-expanded]').click()`,
      );
      if (width === 1440) {
        for (const [title, direction] of [
          ["Loki Ecommerce", "row"],
          ["Gym Ecommerce Hub", "row-reverse"],
          ["GP3Digital Web", "row"],
        ]) {
          assert.equal(
            await evaluate(
              `getComputedStyle(document.querySelector('[data-project=${JSON.stringify(title)}]')).flexDirection`,
            ),
            direction,
            "Existing project layout is preserved",
          );
        }
      }
      assert.ok(
        await evaluate(
          `document.documentElement.scrollWidth<=window.innerWidth`,
        ),
        "Home fits the viewport",
      );
      let shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      await writeFile(
        `.qa-xmate-${width}-${theme}-${language}.png`,
        Buffer.from(shot.data, "base64"),
      );
      await send("Page.navigate", { url: base + "/certifications" });
      await waitFor(
        `document.querySelectorAll('article').length===11 && !!document.querySelector('[data-eag-certificate]')`,
      );
      assert.ok(
        await evaluate(
          `document.querySelector('[data-eag-certificate]').textContent.includes('Ethereum Mainnet · Token #29')`,
        ),
      );
      const layout = await evaluate(
        `getComputedStyle(document.querySelector('[data-eag-certificate]')).display`,
      );
      assert.equal(
        layout,
        width === 375 ? "block" : "grid",
        "EAG stacks on mobile and uses columns on desktop",
      );
      assert.ok(
        await evaluate(
          `document.documentElement.scrollWidth<=window.innerWidth`,
        ),
        "Certificates fit the viewport",
      );
      await new Promise((resolve) => setTimeout(resolve, 650));
      shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      await writeFile(
        `.qa-eag-${width}-${theme}-${language}.png`,
        Buffer.from(shot.data, "base64"),
      );
      await evaluate(
        `document.querySelector('[aria-roledescription="carousel"]').scrollIntoView()`,
      );
      await new Promise((resolve) => setTimeout(resolve, 450));
      const previousTransform = await evaluate(
        `document.querySelector('[aria-roledescription="slide"]').parentElement.style.transform`,
      );
      await evaluate(
        `document.querySelector('button[aria-label=${JSON.stringify(language === "es" ? "Siguientes certificados" : "Next certificates")} ]').click()`,
      );
      await waitFor(
        `document.querySelector('[aria-roledescription="slide"]').parentElement.style.transform!==${JSON.stringify(previousTransform)}`,
      );
      shot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: false,
      });
      await writeFile(
        `.qa-carousel-${width}-${theme}-${language}.png`,
        Buffer.from(shot.data, "base64"),
      );
    }
  }
}
for (const language of ["ES", "EN"]) {
  const response = await fetch(`${base}/images/CV/CV-Juanjose-${language}.pdf`);
  assert.equal(response.status, 200);
  const signature = Buffer.from(await response.arrayBuffer())
    .subarray(0, 5)
    .toString();
  assert.equal(signature, "%PDF-", "CV URLs return PDFs instead of the SPA");
}
assert.deepEqual(errors, [], "No runtime exceptions");
console.log(
  "PASS: home, certificates, filters, search, modal, X-Mate, award, read more, existing project layouts, carousel controls and both CVs at 375/1440 px in light/dark and es/en.",
);
ws.close();
