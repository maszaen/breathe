import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Task } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";
import HomeCard from "./HomeCard";

import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

type MentalHealthCardProps = {
  tasks: Task[];
};

export default function MentalHealthCard({
  tasks,
}: MentalHealthCardProps) {
  const health = calculateMentalHealth(tasks);

  return (
    <HomeCard
      style={{
        backgroundColor: health.color,
        marginBottom: Spacing.lg,
      }}
    >
      <Text style={styles.title}>Mental Health</Text>

      <Text style={styles.percent}>{health.percentage}%</Text>

      <Text style={styles.status}>{health.status}</Text>
    </HomeCard>
  );
}

const styles = StyleSheet.create({

  title: {
    color: "#FFFFFF",
    ...Typography.body,
  },

  percent: {
    marginTop: Spacing.sm,
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  status: {
    marginTop: Spacing.sm,
    color: "#FFFFFF",
    ...Typography.body,
  },
});