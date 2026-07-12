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

export default function RecommendationCard() {
  const { tasks } = useTask();
  const { recommendation, analysis } =
    calculateMentalHealth(tasks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Recommendation
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {recommendation}
        </Text>
      </View>

      <Text style={styles.caption}>
        {analysis}
      </Text>
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
    marginBottom: Spacing.sm,
  },

  badge: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary + "20",
  },

  badgeText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: "600",
    lineHeight: 22,
  },

  caption: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
