interface State {
  audit: string[];
  status: string;
}

type NodeFn = (s: State) => Promise<Partial<State>>;

function withAudit(name: string, fn: NodeFn): NodeFn {
  return async (s) => {
    try {
      const update = await fn(s);
      return { ...update, audit: [...s.audit, `${name}:ok`] };
    } catch (e) {
      return { status: "failed", audit: [...s.audit, `${name}:error:${(e as Error).message}`] };
    }
  };
}

const goodNode = withAudit("analyse", async () => ({ status: "analysed" }));
const badNode = withAudit("validate", async () => {
  throw new Error("rule table missing");
});

let state: State = { audit: [], status: "new" };
state = { ...state, ...(await goodNode(state)) };
state = { ...state, ...(await badNode(state)) };
console.log(state);
