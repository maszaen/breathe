import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

export default function MentalHealthMeter() {
  const { tasks } = useTask();
  const { percentage, status, color } = calculateMentalHealth(tasks);

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Your Score</Text>
          <Text style={styles.score}>{percentage}%</Text>
        </View>
        <View style={styles.iconCircle}>
          <Ionicons name="heart" size={32} color="#fff" />
        </View>
      </View>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` as any },
          ]}
        />
      </View>

      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
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

  score: {
    fontSize: 44,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  iconCircle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Radius.full,
    padding: 12,
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
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});