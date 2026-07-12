import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { sortTasksByDeadline, getDeadlineStatus } from "../../utils/deadline";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type UpcomingDeadlineCardProps = {
  tasks: Task[];
};

export default function UpcomingDeadlineCard({ tasks }: UpcomingDeadlineCardProps) {
  const upcomingTasks = sortTasksByDeadline(tasks.filter((t) => !t.completed));
  const nextTask = upcomingTasks[0];
  const status = nextTask
    ? getDeadlineStatus(nextTask.deadline, nextTask.deadlineTime)
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrap}>
            <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Upcoming Deadline</Text>
        </View>
        {nextTask && (
          <View style={[styles.statusBadge, { backgroundColor: (status?.color ?? Colors.textSecondary) + "20" }]}>
            <Text style={[styles.statusBadgeText, { color: status?.color ?? Colors.textSecondary }]}>
              {status?.text}
            </Text>
          </View>
        )}
      </View>

      {nextTask ? (
        <View style={styles.body}>
          <Text style={styles.taskName} numberOfLines={2}>
            {nextTask.taskName}
          </Text>
          <Text style={styles.course}>{nextTask.course}</Text>

          <View style={styles.dateRow}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.dateText}>
              {nextTask.deadline} · {nextTask.deadlineTime}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyWrap}>
          <Ionicons name="checkmark-circle-outline" size={32} color={Colors.success} />
          <Text style={styles.emptyText}>No upcoming tasks</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    padding: 6,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  statusBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  statusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  body: {
    gap: 4,
  },

  taskName: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  course: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: 6,
  },

  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});