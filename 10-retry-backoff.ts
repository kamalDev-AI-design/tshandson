const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface RetryOptions {
  maxAttempts: number;
  initialMs: number;
  factor: number;
}

async function withRetry<T>(fn: (attempt: number) => Promise<T>, o: RetryOptions): Promise<T> {
  let delay = o.initialMs;
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn(attempt);
    } catch (e) {
      if (attempt >= o.maxAttempts) throw e;
      console.log(`attempt ${attempt} failed (${(e as Error).message}); waiting ${delay} ms`);
      await sleep(delay);
      delay *= o.factor;
    }
  }
}

let calls = 0;
async function flakyModelCall(): Promise<string> {
  calls++;
  if (calls < 3) throw new Error("429 throttled");
  return "label: defect";
}

const result = await withRetry(flakyModelCall, { maxAttempts: 4, initialMs: 20, factor: 2 });
console.log("result:", result, "after", calls, "calls");
