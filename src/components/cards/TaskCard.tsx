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

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

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

  const status = getDeadlineStatus(task.deadline, task.deadlineTime);

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

  const statusBgColor = status.color + "18";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, task.completed && styles.cardCompleted]}
      onPress={onPress}
    >
      {/* Left: Checkbox */}
      <TouchableOpacity
        onPress={onToggle}
        style={styles.checkboxWrap}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View
          style={[
            styles.checkbox,
            task.completed && styles.checkboxChecked,
          ]}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={14} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      {/* Center: Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {task.taskName}
        </Text>

        {!!task.course && (
          <Text style={styles.course} numberOfLines={1}>
            {task.course}
          </Text>
        )}

        <View style={styles.meta}>
          <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
          <Text style={styles.metaText}>
            {task.deadline} · {task.deadlineTime}
          </Text>
        </View>

        {!task.completed && (
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={styles.focusBtn}
              onPress={(e) => {
                e.stopPropagation();
                handleStartFocus();
              }}
              activeOpacity={0.8}
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
            >
              <Ionicons name="timer-outline" size={13} color={Colors.primary} />
              <Text style={styles.focusBtnText}>Focus</Text>
            </TouchableOpacity>

            <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.text}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Right: Delete */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={onDelete}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="trash-outline" size={18} color={Colors.textTertiary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    ...Shadow.sm,
    marginBottom: 8,
  },

  cardCompleted: {
    opacity: 0.65,
  },

  checkboxWrap: {
    marginRight: 12,
    marginTop: 2,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },

  content: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 21,
  },

  titleCompleted: {
    textDecorationLine: "line-through",
    color: Colors.textSecondary,
  },

  course: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    marginTop: 6,
  },

  statusBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  focusBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderColor: Colors.primary + "60",
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  focusBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
  },

  deleteBtn: {
    padding: 4,
    marginLeft: 8,
    marginTop: 2,
  },
});