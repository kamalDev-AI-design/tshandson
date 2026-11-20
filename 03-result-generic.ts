type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

function parsePrice(text: string): Result<number, string> {
  const n = Number(text.replace(",", ""));
  if (Number.isNaN(n)) return err(`not a number: "${text}"`);
  return ok(n);
}

for (const text of ["60", "1,299", "sixty"]) {
  const r = parsePrice(text);
  console.log(text, "->", r.ok ? `ok ${r.value}` : `error ${r.error}`);
}
