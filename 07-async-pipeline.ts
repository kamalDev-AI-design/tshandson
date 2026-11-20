const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type Ctx = { log: string[]; price?: number };

async function ingest(ctx: Ctx): Promise<Ctx> {
  await sleep(10);
  return { ...ctx, log: [...ctx.log, "ingested"], price: 60 };
}
async function analyse(ctx: Ctx): Promise<Ctx> {
  await sleep(10);
  return { ...ctx, log: [...ctx.log, "analysed"] };
}
async function validate(ctx: Ctx): Promise<Ctx> {
  await sleep(10);
  return { ...ctx, log: [...ctx.log, ctx.price === 55 ? "match" : "mismatch"] };
}

let ctx: Ctx = { log: [] };
for (const step of [ingest, analyse, validate]) {
  ctx = await step(ctx);
}
console.log(ctx);
