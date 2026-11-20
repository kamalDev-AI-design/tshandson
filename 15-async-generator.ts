const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface ProgressEvent {
  node: string;
  step: number;
}

async function* runSteps(nodes: string[]): AsyncGenerator<ProgressEvent> {
  let step = 0;
  for (const node of nodes) {
    await sleep(10);
    step++;
    yield { node, step };
  }
}

for await (const event of runSteps(["ingest", "analyse", "validate", "human_review"])) {
  console.log(`data: ${JSON.stringify(event)}`);
}
