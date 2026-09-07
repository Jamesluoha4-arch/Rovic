import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9333;
const STOREFRONT_PASSWORD = process.env.SHOPIFY_STOREFRONT_PASSWORD;
if (!STOREFRONT_PASSWORD) {
  throw new Error("Set SHOPIFY_STOREFRONT_PASSWORD before capturing the storefront.");
}
const OUT_DIR = resolve("screenshots");
mkdirSync(OUT_DIR, { recursive: true });

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

async function waitForJson(url, timeoutMs = 15000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
      lastError = new Error(`${res.status} ${res.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve: done, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else done(message.result);
        return;
      }
      const listeners = this.events.get(message.method) ?? [];
      for (const listener of listeners) listener(message.params ?? {});
    });
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener("open", resolveOpen, { once: true });
      this.ws.addEventListener("error", rejectOpen, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolvePromise, rejectPromise) => {
      this.pending.set(id, { resolve: resolvePromise, reject: rejectPromise });
    });
  }

  once(method) {
    return new Promise((resolveEvent) => {
      const listeners = this.events.get(method) ?? [];
      listeners.push(resolveEvent);
      this.events.set(method, listeners);
    });
  }

  close() {
    this.ws.close();
  }
}

async function createPage() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
  if (!res.ok) throw new Error(`Unable to create target: ${res.status} ${res.statusText}`);
  const target = await res.json();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Network.enable");
  return client;
}

async function navigate(client, url) {
  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await loaded;
  await sleep(1500);
}

async function viewport(client, width, height, mobile = false) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
  });
  if (mobile) {
    await client.send("Emulation.setUserAgentOverride", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
  }
}

async function screenshot(client, name) {
  await client.send("Page.bringToFront");
  const { data } = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const file = resolve(OUT_DIR, `${name}.png`);
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(file);
}

const edge = spawn(EDGE, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${resolve("edge-profile")}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe"] });

try {
  await waitForJson(`http://127.0.0.1:${PORT}/json/version`);
  const page = await createPage();

  await viewport(page, 1440, 1200, false);
  await navigate(page, "https://www.rovicsportsusa.com/password");
  await page.send("Runtime.evaluate", {
    expression: `
      (() => {
        const input = document.querySelector('input[name="password"]');
        if (!input) return "no password input";
        input.value = ${JSON.stringify(STOREFRONT_PASSWORD)};
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.form.submit();
        return "submitted";
      })()
    `,
    awaitPromise: false,
  });
  await sleep(2500);

  await navigate(page, "https://www.rovicsportsusa.com/");
  await screenshot(page, "home-desktop");
  await navigate(page, "https://www.rovicsportsusa.com/collections/all");
  await screenshot(page, "collection-desktop");
  await navigate(page, "https://www.rovicsportsusa.com/products/rovic-qfc");
  await screenshot(page, "qfc-desktop");

  await viewport(page, 390, 844, true);
  await navigate(page, "https://www.rovicsportsusa.com/");
  await screenshot(page, "home-mobile");
  await navigate(page, "https://www.rovicsportsusa.com/collections/all");
  await screenshot(page, "collection-mobile");
  await navigate(page, "https://www.rovicsportsusa.com/products/rovic-qfc");
  await screenshot(page, "qfc-mobile");

  page.close();
} finally {
  edge.kill();
}
