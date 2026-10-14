import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const [tab] = await (await fetch("http://127.0.0.1:9223/json")).json();
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve) =>
  socket.addEventListener("open", resolve, { once: true }),
);
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const request = pending.get(message.id);
    pending.delete(message.id);
    message.error
      ? request.reject(message.error)
      : request.resolve(message.result);
  } else if (message.method === "Runtime.exceptionThrown")
    errors.push(message.params.exceptionDetails.text);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails)
    throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function waitFor(expression) {
  for (let index = 0; index < 80; index++) {
    if (await evaluate(expression)) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out: ${expression}`);
}
await send("Runtime.enable");
await send("Page.enable");
await send("Page.navigate", { url: "http://127.0.0.1:4173/" });
await waitFor(`document.querySelectorAll('#skills article').length===6`);
for (const width of [375, 768, 1440]) {
  for (const theme of ["light", "dark"]) {
    for (const language of ["es", "en"]) {
      await send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 1100,
        deviceScaleFactor: 1,
        mobile: width === 375,
      });
      await evaluate(
        `localStorage.setItem('portfolio-theme',${JSON.stringify(theme)});localStorage.setItem('portfolio-language',${JSON.stringify(language)});`,
      );
      await send("Page.navigate", { url: "http://127.0.0.1:4173/" });
      await waitFor(
        `document.querySelectorAll('#skills article').length===6 && document.documentElement.lang===${JSON.stringify(language)}`,
      );
      await evaluate(`document.querySelector('#skills').scrollIntoView()`);
      await new Promise((resolve) => setTimeout(resolve, 1100));
      await waitFor(
        `[...document.querySelectorAll('#skills article')].every(card=>getComputedStyle(card).opacity==='1')`,
      );
      const columns = await evaluate(
        `getComputedStyle(document.querySelector('[data-skills-grid]')).gridTemplateColumns.split(' ').length`,
      );
      assert.equal(columns, width === 375 ? 1 : width === 768 ? 2 : 3);
      assert.deepEqual(
        await evaluate(
          `[...document.querySelectorAll('[data-skill-category]')].map(node=>node.dataset.skillCategory)`,
        ),
        ["frontend", "automation", "backend", "ai", "marketing", "tools"],
      );
      assert.ok(
        await evaluate(`document.documentElement.scrollWidth<=innerWidth`),
        "No horizontal overflow",
      );
      assert.equal(
        await evaluate(
          `document.querySelectorAll('#skills [aria-roledescription="carousel"], #skills button').length`,
        ),
        0,
        "No carousel controls or levels",
      );
      assert.ok(
        await evaluate(
          `![...document.querySelectorAll('[data-skill-category="ai"] li')].some(node=>node.textContent==='n8n')`,
        ),
      );
      assert.ok(
        await evaluate(
          `document.querySelector('[data-skill-category="ai"]').textContent.includes(${JSON.stringify(language === "es" ? "En aprendizaje" : "Learning")})`,
        ),
      );
      assert.equal(
        await evaluate(`document.documentElement.classList.contains('dark')`),
        theme === "dark",
      );
      assert.ok(
        await evaluate(
          `[...document.querySelectorAll('#skills li svg')].every(icon=>icon.getAttribute('aria-label'))`,
        ),
        "Every logo has an accessible name",
      );
      assert.ok(
        await evaluate(
          `[...document.querySelectorAll('#skills article')].every(card=>['0px','auto'].includes(getComputedStyle(card).minHeight) && getComputedStyle(card).opacity==='1')`,
        ),
        "Cards size to content and finish animating",
      );
      // Calculate contrast for each text-bearing element, including alpha-composited backgrounds.
      const contrast = await evaluate(`(() => {
        const parse=color=>{const values=color.match(/[\\d.]+/g)?.map(Number)??[0,0,0,0];return [...values.slice(0,3),values[3]??1];};
        const over=(fg,bg)=>{const alpha=fg[3]+bg[3]*(1-fg[3]);return [...fg.slice(0,3).map((value,index)=>(value*fg[3]+bg[index]*bg[3]*(1-fg[3]))/alpha),alpha];};
        const background=node=>{const parents=[];for(let current=node;current;current=current.parentElement)parents.unshift(current);return parents.reduce((result,current)=>over(parse(getComputedStyle(current).backgroundColor),result),[255,255,255,1]);};
        const luminance=rgb=>rgb.slice(0,3).map(value=>{const channel=value/255;return channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4;}).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
        return [...document.querySelectorAll('#skills h2,#skills h3,#skills p,#skills li,#skills .text-xs')].map(node=>{const style=getComputedStyle(node),bg=background(node),fg=over(parse(style.color),bg),l1=luminance(fg),l2=luminance(bg);const ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);const large=parseFloat(style.fontSize)>=24||parseFloat(style.fontSize)>=18.66&&Number(style.fontWeight)>=700;return {text:node.textContent.trim(),ratio,required:large?3:4.5};}).filter(item=>item.ratio+0.01<item.required);
      })()`);
      assert.deepEqual(contrast, [], "Text meets WCAG AA contrast");
      await send("Input.dispatchKeyEvent", {
        type: "keyDown",
        key: "Tab",
        code: "Tab",
        windowsVirtualKeyCode: 9,
      });
      await send("Input.dispatchKeyEvent", {
        type: "keyUp",
        key: "Tab",
        code: "Tab",
        windowsVirtualKeyCode: 9,
      });
      await evaluate(`document.querySelector('#skills li').focus()`);
      assert.ok(
        await evaluate(
          `document.activeElement.matches('#skills li:focus-visible') && getComputedStyle(document.activeElement).outlineStyle!=='none'`,
        ),
        "Chips have visible keyboard focus",
      );
      const rect = await evaluate(
        `(()=>{const r=document.querySelector('#skills li').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()`,
      );
      await send("Input.dispatchMouseEvent", {
        type: "mouseMoved",
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      });
      await new Promise((resolve) => setTimeout(resolve, 250));
      assert.deepEqual(
        await evaluate(
          `(()=>{const r=document.querySelector('#skills li').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})()`,
        ),
        rect,
        "Hover does not move the layout",
      );
      const clip = await evaluate(
        `(()=>{const r=document.querySelector('#skills').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height,scale:1};})()`,
      );
      const screenshot = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip,
      });
      await writeFile(
        `.qa-skills-${width}-${theme}-${language}.png`,
        Buffer.from(screenshot.data, "base64"),
      );
    }
  }
}
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await send("Page.navigate", { url: "http://127.0.0.1:4173/" });
await waitFor(`document.querySelectorAll('#skills article').length===6`);
assert.ok(
  await evaluate(
    `[...document.querySelectorAll('#skills article')].every(card=>getComputedStyle(card).opacity==='1')`,
  ),
);
assert.equal(
  await evaluate(
    `getComputedStyle(document.querySelector('[data-skill-category="ai"] .rounded-full.bg-primary')).animationName`,
  ),
  "none",
);
assert.deepEqual(errors, [], "No runtime errors");
console.log(
  "PASS: skills at 375/768/1440 px, light/dark, es/en; categories, logos, no carousel, AA contrast, visible focus, stable hover and reduced motion.",
);
socket.close();
