const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

async function checkLocale(locale: string): Promise<string> {
  await sleep(10);
  if (locale === "de-DE") throw new Error("price mismatch in de-DE");
  return `${locale} ok`;
}

const locales = ["en-US", "de-DE", "fr-FR"];

try {
  const all = await Promise.all(locales.map(checkLocale));
  console.log("all:", all);
} catch (e) {
  console.log("Promise.all stopped at the first failure:", (e as Error).message);
}

const settled = await Promise.allSettled(locales.map(checkLocale));
for (const [i, s] of settled.entries()) {
  console.log(locales[i], s.status, s.status === "fulfilled" ? s.value : (s.reason as Error).message);
}
