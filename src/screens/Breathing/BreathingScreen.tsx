import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { RootStackScreenProps } from "../../types/navigation";

// ── Breathing Patterns ────────────────────────────────────────────────────────
type Pattern = {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdOut?: number;
  color: string;
  bg: string;
};

const PATTERNS: Pattern[] = [
  {
    name: "Box Breathing",
    description: "Equal parts breathing for focus",
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdOut: 4,
    color: Colors.primary,
    bg: Colors.primaryLight,
  },
  {
    name: "4-7-8 Relax",
    description: "Deep calm before sleep",
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    name: "Deep Breath",
    description: "Simple and restorative",
    inhale: 5,
    hold: 2,
    exhale: 5,
    color: Colors.success,
    bg: Colors.successLight,
  },
];

type Phase = "inhale" | "hold" | "exhale" | "holdOut" | "idle";

function phaseLabel(phase: Phase) {
  switch (phase) {
    case "inhale": return "Inhale";
    case "hold": return "Hold";
    case "exhale": return "Exhale";
    case "holdOut": return "Hold";
    default: return "Ready";
  }
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export default function BreathingScreen({ navigation }: RootStackScreenProps<"Breathing">) {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [phaseCount, setPhaseCount] = useState(0); // countdown within phase
  const [totalTime, setTotalTime] = useState(0);   // overall session time
  const [cycleCount, setCycleCount] = useState(0);

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0.4)).current;
  const currentAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const pattern = PATTERNS[selectedPattern];

  // ── Phase sequencer ──────────────────────────────────────────────────────
  const phaseQueue = (): Phase[] => {
    const q: Phase[] = ["inhale", "hold", "exhale"];
    if (pattern.holdOut) q.push("holdOut");
    return q;
  };

  const phaseDuration = (p: Phase): number => {
    switch (p) {
      case "inhale": return pattern.inhale;
      case "hold": return pattern.hold;
      case "exhale": return pattern.exhale;
      case "holdOut": return pattern.holdOut ?? 0;
      default: return 0;
    }
  };

  // Animate ring for a given phase
  const animateForPhase = (p: Phase, duration: number) => {
    if (currentAnimRef.current) currentAnimRef.current.stop();

    const toScale = p === "inhale" ? 1.0 : p === "exhale" || p === "holdOut" ? 0.6 : undefined;
    const toOpacity = p === "inhale" ? 1.0 : p === "exhale" || p === "holdOut" ? 0.4 : undefined;

    if (toScale !== undefined && toOpacity !== undefined) {
      const anim = Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: toScale,
          duration: duration * 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: toOpacity,
          duration: duration * 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
      currentAnimRef.current = anim;
      anim.start();
    }
  };

  // ── State machine refs ───────────────────────────────────────────────────
  const phaseRef = useRef<Phase>("idle");
  const phaseCountRef = useRef(0);
  const isRunningRef = useRef(false);
  const queueIndexRef = useRef(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Start session
  const startSession = () => {
    const queue = phaseQueue();
    queueIndexRef.current = 0;
    const firstPhase = queue[0];
    const firstDur = phaseDuration(firstPhase);

    setPhase(firstPhase);
    setPhaseCount(firstDur);
    phaseCountRef.current = firstDur;
    setCycleCount(0);
    setTotalTime(0);
    setIsRunning(true);
    animateForPhase(firstPhase, firstDur);
  };

  const stopSession = () => {
    setIsRunning(false);
    setPhase("idle");
    setPhaseCount(0);
    setCycleCount(0);
    setTotalTime(0);
    scaleAnim.setValue(0.6);
    opacityAnim.setValue(0.4);
    if (currentAnimRef.current) currentAnimRef.current.stop();
  };

  // Main tick
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      // Increment total session time
      setTotalTime((t) => t + 1);

      // Decrement phase countdown
      phaseCountRef.current -= 1;
      setPhaseCount(phaseCountRef.current);

      if (phaseCountRef.current <= 0) {
        // Advance to next phase
        const queue = phaseQueue();
        queueIndexRef.current = (queueIndexRef.current + 1) % queue.length;

        // Track completed cycles
        if (queueIndexRef.current === 0) {
          setCycleCount((c) => c + 1);
        }

        const nextPhase = queue[queueIndexRef.current];
        const nextDur = phaseDuration(nextPhase);

        phaseCountRef.current = nextDur;
        setPhase(nextPhase);
        setPhaseCount(nextDur);
        animateForPhase(nextPhase, nextDur);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, selectedPattern]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Breathing Exercise</Text>
          <Text style={styles.headerSub}>Calm your mind, reset your focus.</Text>
        </View>
      </View>

      <View style={styles.body}>
        {/* Pattern Picker */}
        {!isRunning && (
          <View style={styles.patternRow}>
            {PATTERNS.map((p, i) => (
              <TouchableOpacity
                key={p.name}
                style={[
                  styles.patternChip,
                  selectedPattern === i && { backgroundColor: p.color },
                ]}
                onPress={() => setSelectedPattern(i)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.patternChipText,
                    selectedPattern === i && { color: "#fff" },
                  ]}
                  numberOfLines={1}
                >
                  {p.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Pattern info */}
        {!isRunning && (
          <View style={[styles.patternInfoCard, { borderColor: pattern.color + "40" }]}>
            <Text style={[styles.patternInfoName, { color: pattern.color }]}>
              {pattern.name}
            </Text>
            <Text style={styles.patternInfoDesc}>{pattern.description}</Text>
            <View style={styles.patternPhases}>
              <View style={styles.phaseChip}>
                <Text style={styles.phaseChipLabel}>Inhale</Text>
                <Text style={[styles.phaseChipVal, { color: pattern.color }]}>{pattern.inhale}s</Text>
              </View>
              <View style={styles.phaseChip}>
                <Text style={styles.phaseChipLabel}>Hold</Text>
                <Text style={[styles.phaseChipVal, { color: pattern.color }]}>{pattern.hold}s</Text>
              </View>
              <View style={styles.phaseChip}>
                <Text style={styles.phaseChipLabel}>Exhale</Text>
                <Text style={[styles.phaseChipVal, { color: pattern.color }]}>{pattern.exhale}s</Text>
              </View>
              {pattern.holdOut && (
                <View style={styles.phaseChip}>
                  <Text style={styles.phaseChipLabel}>Hold</Text>
                  <Text style={[styles.phaseChipVal, { color: pattern.color }]}>{pattern.holdOut}s</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Animated Ring */}
        <View style={styles.ringContainer}>
          {/* Outer static ring */}
          <View style={[styles.ringOuter, { borderColor: pattern.color + "20" }]} />

          {/* Animated ring */}
          <Animated.View
            style={[
              styles.ringInner,
              {
                backgroundColor: pattern.bg,
                borderColor: pattern.color,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />

          {/* Center text */}
          <View style={styles.ringCenter}>
            {isRunning ? (
              <>
                <Text style={[styles.phaseText, { color: pattern.color }]}>
                  {phaseLabel(phase)}
                </Text>
                <Text style={[styles.phaseCount, { color: pattern.color }]}>
                  {phaseCount}
                </Text>
              </>
            ) : (
              <Ionicons name="leaf" size={36} color={pattern.color} />
            )}
          </View>
        </View>

        {/* Stats row (visible when running) */}
        {isRunning && (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{formatTime(totalTime)}</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
            <View style={[styles.statDivider]} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>{cycleCount}</Text>
              <Text style={styles.statLabel}>Cycles</Text>
            </View>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          {!isRunning ? (
            <TouchableOpacity
              style={[styles.btnStart, { backgroundColor: pattern.color }]}
              onPress={startSession}
              activeOpacity={0.85}
            >
              <Ionicons name="play" size={20} color="#fff" />
              <Text style={styles.btnStartText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnStop}
              onPress={stopSession}
              activeOpacity={0.85}
            >
              <Ionicons name="stop" size={20} color={Colors.danger} />
              <Text style={styles.btnStopText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const RING_SIZE = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ── Header ──────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...Shadow.sm,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },

  body: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    alignItems: "center",
    gap: Spacing.md,
  },

  // ── Pattern picker ──────────────────────────────────
  patternRow: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "stretch",
  },
  patternChip: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: "center",
    ...Shadow.sm,
  },
  patternChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  patternInfoCard: {
    alignSelf: "stretch",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    gap: 6,
  },
  patternInfoName: {
    fontSize: 15,
    fontWeight: "800",
  },
  patternInfoDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  patternPhases: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  phaseChip: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    paddingVertical: 8,
    alignItems: "center",
  },
  phaseChipLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  phaseChipVal: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },

  // ── Ring ─────────────────────────────────────────────
  ringContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Spacing.sm,
  },
  ringOuter: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2,
  },
  ringInner: {
    position: "absolute",
    width: RING_SIZE - 16,
    height: RING_SIZE - 16,
    borderRadius: (RING_SIZE - 16) / 2,
    borderWidth: 3,
  },
  ringCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  phaseText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  phaseCount: {
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
    lineHeight: 58,
  },

  // ── Stats ────────────────────────────────────────────
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    alignSelf: "stretch",
    ...Shadow.sm,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  statVal: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // ── Controls ─────────────────────────────────────────
  controls: {
    alignSelf: "stretch",
    marginTop: 4,
  },
  btnStart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: Radius.full,
  },
  btnStartText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  btnStop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.danger,
  },
  btnStopText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.danger,
  },
});
