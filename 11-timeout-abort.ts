function slowTask(ms: number, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve("finished"), ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

try {
  const out = await slowTask(300, AbortSignal.timeout(50));
  console.log(out);
} catch (e) {
  const err = e as Error;
  console.log("name:", err.name);
  console.log("is timeout:", err.name === "TimeoutError");
}
