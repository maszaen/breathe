import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";
import { usePomodoro } from "../../context/PomodoroContext";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type Props = {
  navigation: any;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function PomodoroScreen({ navigation }: Props) {
  const { tasks } = useTask();
  const {
    activeTaskId,
    sessionType,
    isRunning,
    remainingSeconds,
    completedFocusSessions,
    finishFocus,
    pauseTimer,
    resumeTimer,
    stopSession,
  } = usePomodoro();

  const previousSessionType = useRef(sessionType);

  const activeTask =
    tasks.find((task) => task.id === activeTaskId) ?? null;

  // Back — navigate to previous screen (goBack respects where user came from)
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Main", { screen: "Home" });
    }
  };

  // ── Focus View ────────────────────────────────────────────────
  const renderFocusView = () => (
    <View style={styles.sessionCard}>
      {/* Badge */}
      <View style={[styles.badge, styles.badgeFocus]}>
        <Ionicons name="flash" size={14} color={Colors.primary} />
        <Text style={[styles.badgeText, { color: Colors.primary }]}>
          Focus Session
        </Text>
      </View>

      {/* Task info */}
      <Text style={styles.taskName} numberOfLines={2}>
        {activeTask?.taskName ?? "Focused task"}
      </Text>
      {!!activeTask?.course && (
        <Text style={styles.course}>{activeTask.course}</Text>
      )}

      {/* Timer */}
      <View style={styles.timerWrap}>
        <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
        <Text style={styles.timerLabel}>remaining</Text>
      </View>

      <Text style={styles.caption}>
        Stay focused on this task until the timer ends.
      </Text>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={isRunning ? pauseTimer : resumeTimer}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isRunning ? "pause" : "play"}
            size={18}
            color="#fff"
          />
          <Text style={styles.btnPrimaryText}>
            {isRunning ? "Pause" : "Resume"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => finishFocus()}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSecondaryText}>End Focus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ── Break View ────────────────────────────────────────────────
  const renderBreakView = () => (
    <View style={styles.sessionCard}>
      <View style={[styles.badge, styles.badgeBreak]}>
        <Ionicons name="cafe" size={14} color={Colors.success} />
        <Text style={[styles.badgeText, { color: Colors.success }]}>
          Break Time
        </Text>
      </View>

      <Text style={styles.taskName}>Recharge before the next sprint</Text>

      <View style={styles.timerWrap}>
        <Text style={[styles.timer, { color: Colors.success }]}>
          {formatTime(remainingSeconds)}
        </Text>
        <Text style={styles.timerLabel}>break remaining</Text>
      </View>

      <Text style={styles.caption}>
        Use this time to reset. The next focus session starts after break ends.
      </Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: Colors.success }]}
          onPress={() => { if (!isRunning) resumeTimer(); }}
          activeOpacity={0.85}
        >
          <Ionicons name="play" size={18} color="#fff" />
          <Text style={styles.btnPrimaryText}>Continue Break</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => stopSession()}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSecondaryText}>End Break</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ── Idle View ─────────────────────────────────────────────────
  const renderIdleView = () => (
    <View style={styles.sessionCard}>
      <View style={[styles.badge, styles.badgeFocus]}>
        <Ionicons name="timer-outline" size={14} color={Colors.primary} />
        <Text style={[styles.badgeText, { color: Colors.primary }]}>
          Pomodoro Timer
        </Text>
      </View>

      <Text style={styles.taskName}>Ready to focus?</Text>
      <Text style={styles.caption}>
        Start a focus session from the task list to begin your Pomodoro workflow.
      </Text>

      <View style={styles.timerWrap}>
        <Text style={[styles.timer, { color: Colors.textSecondary }]}>
          25:00
        </Text>
        <Text style={styles.timerLabel}>default focus time</Text>
      </View>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={handleBack}
        activeOpacity={0.85}
      >
        <Ionicons name="arrow-back" size={18} color="#fff" />
        <Text style={styles.btnPrimaryText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  // ── Root ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color={Colors.primary} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Pomodoro</Text>
            <Text style={styles.headerSub}>Focus, reset, repeat.</Text>
          </View>
        </View>

        {/* Sessions completed */}
        <View style={styles.statsCard}>
          <View style={styles.statsIcon}>
            <Ionicons name="trophy" size={20} color={Colors.warning} />
          </View>
          <View>
            <Text style={styles.statsLabel}>Completed Sessions</Text>
            <Text style={styles.statsValue}>{completedFocusSessions}</Text>
          </View>
        </View>

        {/* Session view */}
        {sessionType === "focus"
          ? renderFocusView()
          : sessionType === "break"
          ? renderBreakView()
          : renderIdleView()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 100,
    gap: 12,
  },

  // ── Header ───────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
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

  // ── Stats card ───────────────────────────────────
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    ...Shadow.sm,
  },

  statsIcon: {
    backgroundColor: Colors.warningLight,
    borderRadius: Radius.full,
    padding: 10,
  },

  statsLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  statsValue: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.primary,
    marginTop: 2,
  },

  // ── Session card ─────────────────────────────────
  sessionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.sm,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
    marginBottom: 4,
  },

  badgeFocus: {
    backgroundColor: Colors.primaryLight,
  },

  badgeBreak: {
    backgroundColor: Colors.successLight,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  taskName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 26,
  },

  course: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  timerWrap: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },

  timer: {
    fontSize: 60,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: 2,
  },

  timerLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // ── Buttons ──────────────────────────────────────
  btnRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: 4,
  },

  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },

  btnPrimaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  btnSecondary: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  btnSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
});
