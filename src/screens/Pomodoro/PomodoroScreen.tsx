import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";
import { usePomodoro } from "../../context/PomodoroContext";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { RootStackScreenProps } from "../../types/navigation";

type Props = RootStackScreenProps<"Pomodoro">;

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
    setTimer,
    startFocus,
  } = usePomodoro();

  const [isEditingTime, setIsEditingTime] = React.useState(false);
  const [tempMin, setTempMin] = React.useState("25");

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

  const handleTimerPress = () => {
    if (!isRunning) {
      setTempMin(String(Math.floor(remainingSeconds / 60)));
      setIsEditingTime(true);
    }
  };

  const handleTimerSubmit = () => {
    setIsEditingTime(false);
    const min = parseInt(tempMin, 10);
    if (!isNaN(min) && min > 0) {
      setTimer(min * 60);
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
      {activeTask ? (
        <View style={styles.activeTaskCard}>
          <View style={styles.activeTaskIcon}>
            <Ionicons name="document-text" size={20} color={Colors.primary} />
          </View>
          <View style={styles.activeTaskDetails}>
            <Text style={styles.activeTaskName} numberOfLines={2}>
              {activeTask.taskName}
            </Text>
            {!!activeTask.course && (
              <Text style={styles.activeTaskCourse}>{activeTask.course}</Text>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.taskName} numberOfLines={2}>
          General Focus Session
        </Text>
      )}

      {/* Timer */}
      <View style={styles.timerWrap}>
        {isEditingTime ? (
          <TextInput
            style={[styles.timer, styles.timerInput]}
            value={tempMin}
            onChangeText={setTempMin}
            keyboardType="number-pad"
            autoFocus
            onBlur={handleTimerSubmit}
            onSubmitEditing={handleTimerSubmit}
            maxLength={3}
          />
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={handleTimerPress} disabled={isRunning}>
            <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.timerLabel}>remaining (tap to edit)</Text>
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
          style={[styles.btnSecondary, isRunning && { opacity: 0.5 }]}
          onPress={() => finishFocus()}
          activeOpacity={0.85}
          disabled={isRunning}
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
        {isEditingTime ? (
          <TextInput
            style={[styles.timer, styles.timerInput, { color: Colors.success }]}
            value={tempMin}
            onChangeText={setTempMin}
            keyboardType="number-pad"
            autoFocus
            onBlur={handleTimerSubmit}
            onSubmitEditing={handleTimerSubmit}
            maxLength={3}
          />
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={handleTimerPress} disabled={isRunning}>
            <Text style={[styles.timer, { color: Colors.success }]}>
              {formatTime(remainingSeconds)}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.timerLabel}>break remaining (tap to edit)</Text>
      </View>

      <Text style={styles.caption}>
        Use this time to reset. The next focus session starts after break ends.
      </Text>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: Colors.success }]}
          onPress={isRunning ? pauseTimer : resumeTimer}
          activeOpacity={0.85}
        >
          <Ionicons name={isRunning ? "pause" : "play"} size={18} color="#fff" />
          <Text style={styles.btnPrimaryText}>
            {isRunning ? "Pause" : "Continue Break"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnSecondary, isRunning && { opacity: 0.5 }]}
          onPress={() => stopSession()}
          activeOpacity={0.85}
          disabled={isRunning}
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
        {isEditingTime ? (
          <TextInput
            style={[styles.timer, styles.timerInput, { color: Colors.textSecondary }]}
            value={tempMin}
            onChangeText={setTempMin}
            keyboardType="number-pad"
            autoFocus
            onBlur={handleTimerSubmit}
            onSubmitEditing={handleTimerSubmit}
            maxLength={3}
          />
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={handleTimerPress}>
            <Text style={[styles.timer, { color: Colors.textSecondary }]}>
              {formatTime(remainingSeconds)}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.timerLabel}>focus time (tap to edit)</Text>
      </View>

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => startFocus()}
        activeOpacity={0.85}
      >
        <Ionicons name="play" size={18} color="#fff" />
        <Text style={styles.btnPrimaryText}>Start Focus</Text>
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

  activeTaskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primaryLight,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },

  activeTaskIcon: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: Radius.full,
  },

  activeTaskDetails: {
    flex: 1,
  },

  activeTaskName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary,
  },

  activeTaskCourse: {
    fontSize: 12,
    color: Colors.primary,
    opacity: 0.8,
    marginTop: 2,
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
    textAlign: "center",
  },

  timerInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingVertical: 0,
    minWidth: 100,
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    flex: 1,
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
