import { z } from "zod";

const Suggestion = z.object({
  label: z.enum(["authorised_change", "wrong_test", "defect", "needs_more_info"]),
  rationale: z.string().max(200),
  evidenceIds: z.array(z.string()).min(1),
  confidence: z.number().min(0).max(1),
});
type Suggestion = z.infer<typeof Suggestion>;

function parseModelOutput(raw: string): Suggestion | string {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return "MODEL_OUTPUT_NOT_JSON";
  }
  const r = Suggestion.safeParse(json);
  return r.success ? r.data : "MODEL_OUTPUT_INVALID: " + r.error.issues[0]?.path.join(".");
}

console.log(parseModelOutput('{"label":"defect","rationale":"60 differs from rule 55","evidenceIds":["AC-114"],"confidence":0.8}'));
console.log(parseModelOutput('{"label":"probably_change","rationale":"x","evidenceIds":["AC1"],"confidence":0.5}'));
console.log(parseModelOutput("Sure! Here is my answer..."));
