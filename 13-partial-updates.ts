interface State {
  runId: string;
  rendered?: number;
  expected?: number;
  status: "running" | "match" | "mismatch";
  audit: string[];
}

type NodeFn = (s: State) => Partial<State>;

const ingest: NodeFn = () => ({ rendered: 60, expected: 55, audit: ["ingested"] });
const compare: NodeFn = (s) => ({
  status: s.rendered === s.expected ? "match" : "mismatch",
  audit: [...s.audit, "compared"],
});

let state: State = { runId: "run-1", status: "running", audit: [] };
for (const node of [ingest, compare]) {
  const update = node(state);
  console.log(node === ingest ? "ingest" : "compare", "returned", update);
  state = { ...state, ...update };
}
console.log("final:", state);
