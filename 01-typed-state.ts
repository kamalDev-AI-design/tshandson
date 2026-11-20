interface CmsEvent {
  eventId: string;
  locale: string;
  field: string;
  oldValue: string;
  newValue: string;
}

interface RunState {
  runId: string;
  event: CmsEvent;
  reruns: number;
  audit: string[];
}

const state: RunState = {
  runId: "run-1",
  event: { eventId: "evt-100", locale: "en-US", field: "price", oldValue: "50", newValue: "60" },
  reruns: 0,
  audit: [],
};

state.audit.push("ingested");
console.log(state);

// Uncomment the next line: the compiler rejects the typo `rerun`.
// state.rerun = 1;
