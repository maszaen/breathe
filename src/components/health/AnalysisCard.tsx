import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

export default function AnalysisCard() {
  const { tasks } = useTask();
  const health = calculateMentalHealth(tasks);

  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overdueTasks = tasks.filter((task) => {
    if (task.completed) return false;
    const parts = task.deadline.split("/");
    if (parts.length !== 3) return false;
    const deadline = new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0])
    );
    return deadline.getTime() < Date.now();
  }).length;

  const stats = [
    {
      icon: "list-outline" as const,
      label: "Active",
      value: activeTasks,
      bgColor: Colors.primaryLight,
      iconColor: Colors.primaryDark,
      valueColor: Colors.primaryDark,
    },
    {
      icon: "checkmark-circle-outline" as const,
      label: "Done",
      value: completedTasks,
      bgColor: Colors.successLight,
      iconColor: Colors.success,
      valueColor: Colors.success,
    },
    {
      icon: "alert-circle-outline" as const,
      label: "Overdue",
      value: overdueTasks,
      bgColor: Colors.dangerLight,
      iconColor: Colors.danger,
      valueColor: Colors.danger,
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Analysis</Text>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={[styles.statItem, { backgroundColor: stat.bgColor }]}>
            <Ionicons name={stat.icon} size={20} color={stat.iconColor} />
            <Text style={[styles.statValue, { color: stat.valueColor }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: stat.iconColor }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Overall Status</Text>
        <View style={[styles.statusBadge, { backgroundColor: health.color + "20" }]}>
          <Text style={[styles.statusValue, { color: health.color }]}>
            {health.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
  },

  statItem: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: "center",
    gap: 4,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 11,
    fontWeight: "600",
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  statusLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  statusBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  statusValue: {
    fontSize: 13,
    fontWeight: "700",
  },
});