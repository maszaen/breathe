import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

export default function RecommendationCard() {
  const { tasks } = useTask();
  const { recommendation, analysis } = calculateMentalHealth(tasks);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={18} color="#7C3AED" />
        </View>
        <Text style={styles.title}>Recommendation</Text>
      </View>

      <View style={styles.recBox}>
        <Text style={styles.recText}>{recommendation}</Text>
      </View>

      <Text style={styles.analysis}>{analysis}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    gap: Spacing.sm,
    ...Shadow.sm,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    backgroundColor: "#EDE9FE",
    borderRadius: Radius.full,
    padding: 7,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  recBox: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },

  recText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryDark,
    lineHeight: 22,
  },

  analysis: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
