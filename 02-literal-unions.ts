const LABELS = ["authorised_change", "wrong_test", "defect", "needs_more_info"] as const;
type Label = (typeof LABELS)[number];

function isLabel(value: unknown): value is Label {
  return typeof value === "string" && (LABELS as readonly string[]).includes(value);
}

const inputs: unknown[] = ["defect", "probably_change", 42];
for (const input of inputs) {
  console.log(JSON.stringify(input), "->", isLabel(input));
}

function describe(label: Label): string {
  return `Reviewer chose ${label.replace("_", " ")}`;
}
console.log(describe("wrong_test"));
