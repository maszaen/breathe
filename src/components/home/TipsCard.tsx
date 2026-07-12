import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type TipsCardProps = {
  tasks: Task[];
};

export default function TipsCard({ tasks }: TipsCardProps) {
  const health = calculateMentalHealth(tasks);

  let tip = "";
  if (health.percentage >= 80) {
    tip = "Great job! Keep maintaining your healthy productivity habits.";
  } else if (health.percentage >= 60) {
    tip = "You're doing well. Don't forget to take short breaks between sessions.";
  } else if (health.percentage >= 40) {
    tip = "Your workload is increasing. Try finishing the nearest deadline first.";
  } else {
    tip = "Take a break and prioritize your most important tasks right now.";
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="bulb" size={18} color={Colors.warning} />
        </View>
        <Text style={styles.title}>Daily Tip</Text>
      </View>
      <Text style={styles.tip}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.warningLight,
    borderRadius: 24,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.sm,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    backgroundColor: "#FDE68A",
    borderRadius: Radius.full,
    padding: 6,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  tip: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 22,
    fontWeight: "400",
  },
});