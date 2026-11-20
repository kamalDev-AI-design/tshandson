class TransientError extends Error {
  readonly retryable = true;
  constructor(message: string) {
    super(message);
    this.name = "TransientError";
  }
}

class PermanentError extends Error {
  readonly retryable = false;
  constructor(message: string) {
    super(message);
    this.name = "PermanentError";
  }
}

function isRetryable(e: unknown): boolean {
  return e instanceof TransientError;
}

const failures: unknown[] = [
  new TransientError("429 throttled"),
  new PermanentError("403 forbidden"),
  new Error("unexpected"),
];

for (const f of failures) {
  const e = f as Error;
  console.log(`${e.name}: ${e.message} -> retry? ${isRetryable(f)}`);
}
