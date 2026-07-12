import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { POMODORO_DEFAULTS } from "../constants/pomodoro";
import type { PomodoroSessionType } from "../constants/pomodoro";

type PomodoroContextType = {
  activeTaskId: number | null;
  sessionType: PomodoroSessionType;
  isRunning: boolean;
  remainingSeconds: number;
  completedFocusSessions: number;
  startFocus: (taskId?: number | null) => boolean;
  startBreak: () => void;
  finishFocus: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopSession: () => void;
  resetSession: () => void;
  setTimer: (seconds: number) => void;
};

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [sessionType, setSessionType] = useState<PomodoroSessionType>("idle");
  const [isRunning, setIsRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(POMODORO_DEFAULTS.focusDurationSeconds);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (sessionType === "focus") {
            setCompletedFocusSessions((count) => count + 1);
            setSessionType("break");
            return POMODORO_DEFAULTS.breakDurationSeconds;
          }

          setSessionType("idle");
          setActiveTaskId(null);
          setIsRunning(false);
          return POMODORO_DEFAULTS.focusDurationSeconds;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, sessionType]);

  const startFocus = (taskId: number | null = null) => {
    if (
      sessionType !== "idle" ||
      activeTaskId !== null ||
      isRunning
    ) {
      return false;
    }

    setActiveTaskId(taskId);
    setSessionType("focus");
    setIsRunning(true);
    setRemainingSeconds(POMODORO_DEFAULTS.focusDurationSeconds);

    return true;
  };

  const startBreak = () => {

    setSessionType("break");
    setIsRunning(true);
    setRemainingSeconds(POMODORO_DEFAULTS.breakDurationSeconds);
  };

  const finishFocus = () => {
    if (sessionType !== "focus") return;

    setCompletedFocusSessions((count) => count + 1);
    setSessionType("break");
    setRemainingSeconds(POMODORO_DEFAULTS.breakDurationSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    if (sessionType === "idle") return;
    setIsRunning(true);
  };

  const stopSession = () => {
    setIsRunning(false);
    setSessionType("idle");
    setRemainingSeconds(POMODORO_DEFAULTS.focusDurationSeconds);
    setActiveTaskId(null);
  };

  const resetSession = () => {
    stopSession();
  };

  const setTimer = (seconds: number) => {
    if (!isRunning) {
      setRemainingSeconds(seconds);
    }
  };

  const value = useMemo<PomodoroContextType>(() => ({
    activeTaskId,
    sessionType,
    isRunning,
    remainingSeconds,
    completedFocusSessions,
    startFocus,
    startBreak,
    finishFocus,
    pauseTimer,
    resumeTimer,
    stopSession,
    resetSession,
    setTimer,
  }), [
    activeTaskId,
    sessionType,
    isRunning,
    remainingSeconds,
    completedFocusSessions,
  ]);

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);

  if (!context) {
    throw new Error("usePomodoro must be used inside PomodoroProvider");
  }

  return context;
}
