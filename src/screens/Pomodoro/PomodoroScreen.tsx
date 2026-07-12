import React, { useEffect, useRef } from "react";
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

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

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

  useEffect(() => {
    const previousType = previousSessionType.current;
    previousSessionType.current = sessionType;

    if (
      previousType !== "idle" &&
      sessionType === "idle" &&
      activeTaskId === null
    ) {
      navigation.navigate("Main", {
        screen: "Task",
      });
    }
  }, [activeTaskId, navigation, sessionType]);

  const handleBackToTask = () => {
    navigation.navigate("Main", {
      screen: "Task",
    });
  };

  const renderFocusView = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Ionicons
            name="flash-outline"
            size={18}
            color={Colors.primary}
          />
          <Text style={styles.badgeText}>Focus Session</Text>
        </View>
      </View>

      <Text style={styles.title}>Stay with this task</Text>
      <Text style={styles.taskName}>
        {activeTask?.taskName ?? "Focused task"}
      </Text>
      <Text style={styles.course}>
        {activeTask?.course ?? "No course info"}
      </Text>
      <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
      <Text style={styles.caption}>
        Keep your attention on the current task until the timer ends.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            if (isRunning) {
              pauseTimer();
            } else {
              resumeTimer();
            }
          }}
        >
          <Text style={styles.primaryButtonText}>
            {isRunning ? "Pause" : "Resume"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => finishFocus()}
        >
          <Text style={styles.secondaryButtonText}>End Focus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBreakView = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Ionicons
            name="cafe-outline"
            size={18}
            color={Colors.success}
          />
          <Text style={styles.badgeText}>Break Session</Text>
        </View>
      </View>

      <Text style={styles.title}>Recharge before the next sprint</Text>
      <Text style={styles.timer}>{formatTime(remainingSeconds)}</Text>
      <Text style={styles.caption}>
        Use this time to reset. The next focus session can start after the break ends.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            if (!isRunning) {
              resumeTimer();
            }
          }}
        >
          <Text style={styles.primaryButtonText}>Continue Break</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => stopSession()}
        >
          <Text style={styles.secondaryButtonText}>End Break</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderTitle}>Fun Break Placeholder</Text>
        <Text style={styles.placeholderText}>
          Music, video, games, and breathing activities will be added here in a future step.
        </Text>

        <View style={styles.placeholderList}>
          {[
            { label: "Music", icon: "musical-notes-outline" },
            { label: "Video", icon: "play-circle-outline" },
            { label: "Games", icon: "game-controller-outline" },
            { label: "Breathing", icon: "leaf-outline" },
          ].map((item) => (
            <View key={item.label} style={styles.placeholderItem}>
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={18}
                color={Colors.primary}
              />
              <Text style={styles.placeholderItemText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderIdleView = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Pomodoro ready</Text>
      <Text style={styles.caption}>
        Start a focus session from the task list to begin the full workflow.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleBackToTask}
      >
        <Text style={styles.primaryButtonText}>Back to Tasks</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToTask}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Pomodoro</Text>
            <Text style={styles.headerSubtitle}>
              Focus, reset, and return to your tasks.
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Completed Focus Sessions</Text>
          <Text style={styles.summaryValue}>{completedFocusSessions}</Text>
        </View>

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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.primary,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  summaryValue: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  cardHeader: {
    marginBottom: Spacing.md,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: Radius.full,
    backgroundColor: "#EAF8FF",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  badgeText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },
  taskName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },
  course: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timer: {
    marginTop: Spacing.lg,
    fontSize: 54,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: 2,
  },
  caption: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonRow: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  primaryButtonText: {
    color: Colors.surface,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: "700",
  },
  placeholderBox: {
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: Radius.lg,
    padding: Spacing.md,
    backgroundColor: "#FAFCFF",
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  placeholderText: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  placeholderList: {
    marginTop: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  placeholderItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 8,
  },
  placeholderItemText: {
    marginLeft: 6,
    fontSize: 13,
    color: Colors.text,
  },
});
