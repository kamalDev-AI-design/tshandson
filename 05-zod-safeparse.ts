import { z } from "zod";

const CmsEvent = z.object({
  eventId: z.string().min(1),
  locale: z.string().min(2),
  field: z.string(),
  newValue: z.string(),
});

const good = { eventId: "evt-1", locale: "en-US", field: "price", newValue: "60" };
const bad = { eventId: "", locale: "en-US", field: "price" };

for (const [name, input] of [["good", good], ["bad", bad]] as const) {
  const r = CmsEvent.safeParse(input);
  if (r.success) {
    console.log(name, "-> valid", r.data.eventId);
  } else {
    console.log(name, "-> invalid");
    for (const issue of r.error.issues) console.log(" ", issue.path.join("."), issue.message);
  }
}
