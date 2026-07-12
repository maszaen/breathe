export const POMODORO_DEFAULTS = {
  focusDurationSeconds: 5 * 60,
  breakDurationSeconds: 5 * 60,
} as const;

export type PomodoroSessionType =
  | "idle"
  | "focus"
  | "break";
