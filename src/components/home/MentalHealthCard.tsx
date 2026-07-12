import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type MentalHealthCardProps = {
  tasks: Task[];
};

export default function MentalHealthCard({ tasks }: MentalHealthCardProps) {
  const health = calculateMentalHealth(tasks);

  return (
    <View style={[styles.container, { backgroundColor: health.color }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Mental Health Score</Text>
          <Text style={styles.percent}>{health.percentage}%</Text>
        </View>
        <View style={styles.iconWrap}>
          <Ionicons name="heart" size={28} color="#fff" />
        </View>
      </View>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${health.percentage}%` as any },
          ]}
        />
      </View>

      <Text style={styles.status}>{health.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: Spacing.lg,
    gap: Spacing.sm,
    ...Shadow.sm,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  label: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "500",
    marginBottom: 4,
  },

  percent: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  iconWrap: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Radius.full,
    padding: 10,
  },

  barTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: Radius.full,
    overflow: "hidden",
    marginTop: 4,
  },

  barFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: Radius.full,
  },

  status: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});