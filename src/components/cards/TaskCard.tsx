import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { usePomodoro } from "../../context/PomodoroContext";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

import { getDeadlineStatus } from "../../utils/deadline";

type Props = {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onStartFocus: () => void;
};

export default function TaskCard({
  task,
  onPress,
  onToggle,
  onDelete,
  onStartFocus,
}: Props) {
  const { startFocus } = usePomodoro();

  const status = getDeadlineStatus(
    task.deadline,
    task.deadlineTime
  );

  const handleStartFocus = () => {
    if (task.completed) return;

    const success = startFocus(task.id);

    if (!success) {
      Alert.alert(
        "Focus Session Active",
        "Finish your current focus session first."
      );
      return;
    }

    onStartFocus();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={styles.checkbox}
      >
        <Ionicons
          name={
            task.completed
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={24}
          color={
            task.completed
              ? Colors.success
              : Colors.textSecondary
          }
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            task.completed &&
              styles.completed,
          ]}
        >
          {task.taskName}
        </Text>

        <Text style={styles.course}>
          {task.course}
        </Text>

        <Text style={styles.deadline}>
          {task.deadline}
        </Text>

        <Text style={styles.time}>
          {task.deadlineTime}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color: status.color,
            },
          ]}
        >
          {status.text}
        </Text>

        {!task.completed && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
              handleStartFocus();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>
              Start Focus Session
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Ionicons
          name="trash-outline"
          size={22}
          color={Colors.danger}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    paddingHorizontal: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6", // Lighter gray for thin divider
  },

  checkbox: {
    marginRight: 16,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  completed: {
    textDecorationLine: "line-through",
    color: Colors.textSecondary,
  },

  course: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  deadline: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },

  time: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
  },

  status: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
  },

  actionButton: {
    marginTop: Spacing.sm,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  actionButtonText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "700",
  },

  deleteButton: {
    padding: 10,
    marginLeft: 8,
  },
});