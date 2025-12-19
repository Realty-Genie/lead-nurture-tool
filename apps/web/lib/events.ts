type Lead = any;

// Lightweight cross-tab/cross-window event bus for leads updates.
// Uses BroadcastChannel when available (works across tabs). Falls back to an in-memory EventTarget.

const CHANNEL_NAME = "lead-nurture-tool:leads";

let bc: BroadcastChannel | null = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    // @ts-ignore
    bc = new BroadcastChannel(CHANNEL_NAME);
  }
} catch (e) {
  bc = null;
}

const ets = typeof window !== "undefined" ? new EventTarget() : null;

export function publishLeadAdded(lead: Lead) {
  const payload = { type: "lead-added", lead };
  try {
    if (bc) {
      bc.postMessage(payload);
    }
    if (ets) {
      ets.dispatchEvent(new CustomEvent("lead-added", { detail: lead }));
    }
  } catch (e) {
    console.error("publishLeadAdded error", e);
  }
}

export function publishLeadsBatchAdded(leads: Lead[]) {
  const payload = { type: "leads-batch-added", leads };
  try {
    if (bc) {
      bc.postMessage(payload);
    }
    if (ets) {
      ets.dispatchEvent(
        new CustomEvent("leads-batch-added", { detail: leads })
      );
    }
  } catch (e) {
    console.error("publishLeadsBatchAdded error", e);
  }
}

export function subscribeLeadAdded(handler: (lead: Lead) => void) {
  const wrapped = (e: any) => {
    try {
      if (e && e.data && e.data.type === "lead-added") {
        handler(e.data.lead);
      } else if (e && e.type === "lead-added") {
        handler(e.detail);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (bc) {
    bc.addEventListener("message", wrapped);
  }
  if (ets) {
    ets.addEventListener("lead-added", wrapped as EventListener);
  }

  return () => {
    if (bc) bc.removeEventListener("message", wrapped);
    if (ets) ets.removeEventListener("lead-added", wrapped as EventListener);
  };
}

export function subscribeLeadsBatchAdded(handler: (leads: Lead[]) => void) {
  const wrapped = (e: any) => {
    try {
      if (e && e.data && e.data.type === "leads-batch-added") {
        handler(e.data.leads);
      } else if (e && e.type === "leads-batch-added") {
        handler(e.detail);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (bc) {
    bc.addEventListener("message", wrapped);
  }
  if (ets) {
    ets.addEventListener("leads-batch-added", wrapped as EventListener);
  }

  return () => {
    if (bc) bc.removeEventListener("message", wrapped);
    if (ets)
      ets.removeEventListener("leads-batch-added", wrapped as EventListener);
  };
}
