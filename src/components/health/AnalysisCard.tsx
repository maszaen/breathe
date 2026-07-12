import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useTask } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export default function AnalysisCard() {
  const { tasks } = useTask();
  const health = calculateMentalHealth(tasks);

  const activeTasks = tasks.filter(
    (task) => !task.completed
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Today's Analysis
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, { color: health.color }]}>
          {health.status}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Active Tasks</Text>
        <Text style={styles.value}>{activeTasks}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Completed Tasks</Text>
        <Text style={styles.value}>{completedTasks}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Overdue Tasks</Text>
        <Text style={styles.value}>{overdueTasks}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },

  label: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  value: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.primary,
  },
});