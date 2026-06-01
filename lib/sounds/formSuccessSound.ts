/**
 * Short ascending success chime (UPI / payment-app style).
 * Synthesized in-browser — no external audio file.
 * Call only after a user gesture (e.g. form submit).
 */
export function playFormSuccessSound() {
  if (typeof window === "undefined") return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const t0 = ctx.currentTime;

    const notes: Array<{ freq: number; at: number; dur: number; gain: number }> = [
      { freq: 659.25, at: 0, dur: 0.09, gain: 0.12 },
      { freq: 830.61, at: 0.09, dur: 0.09, gain: 0.14 },
      { freq: 987.77, at: 0.18, dur: 0.22, gain: 0.16 },
    ];

    for (const { freq, at, dur, gain } of notes) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0 + at);
      g.gain.setValueAtTime(0.0001, t0 + at);
      g.gain.exponentialRampToValueAtTime(gain, t0 + at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t0 + at);
      osc.stop(t0 + at + dur + 0.04);
    }

    window.setTimeout(() => {
      void ctx.close();
    }, 600);
  } catch {
    /* Autoplay policy or unsupported — ignore */
  }
}
