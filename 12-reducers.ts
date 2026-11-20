type Reducer<T> = (left: T, right: T) => T;

const overwrite: Reducer<string> = (_left, right) => right;
const append: Reducer<string[]> = (left, right) => left.concat(right);

interface State {
  decision: string;
  audit: string[];
}

const reducers: { [K in keyof State]: Reducer<State[K]> } = {
  decision: overwrite,
  audit: append,
};

function applyUpdate(state: State, update: Partial<State>): State {
  const next = { ...state };
  for (const key of Object.keys(update) as (keyof State)[]) {
    const value = update[key];
    if (value !== undefined) {
      (next as Record<string, unknown>)[key] = (reducers[key] as Reducer<unknown>)(state[key], value);
    }
  }
  return next;
}

let s: State = { decision: "none", audit: [] };
s = applyUpdate(s, { decision: "defect", audit: ["reviewed"] });
s = applyUpdate(s, { decision: "authorised_change", audit: ["corrected"] });
console.log(s);
