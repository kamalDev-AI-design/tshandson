type StepOutcome =
  | { kind: "ok"; value: number }
  | { kind: "retry"; afterMs: number }
  | { kind: "fail"; reason: string };

function describe(outcome: StepOutcome): string {
  switch (outcome.kind) {
    case "ok":
      return `done with ${outcome.value}`;
    case "retry":
      return `retry in ${outcome.afterMs} ms`;
    case "fail":
      return `failed: ${outcome.reason}`;
    default: {
      const unreachable: never = outcome; // compile error if a case is missing
      return unreachable;
    }
  }
}

const outcomes: StepOutcome[] = [
  { kind: "ok", value: 55 },
  { kind: "retry", afterMs: 500 },
  { kind: "fail", reason: "rule not found" },
];
outcomes.forEach((o) => console.log(describe(o)));
