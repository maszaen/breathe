import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Task } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import HomeCard from "./HomeCard";

type TipsCardProps = {
  tasks: Task[];
};

export default function TipsCard({
  tasks,
}: TipsCardProps) {
  const health = calculateMentalHealth(tasks);

  let tip = "";

  if (health.percentage >= 80) {
    tip =
      "Great job! Keep maintaining your healthy productivity.";
  } else if (health.percentage >= 60) {
    tip =
      "You're doing well. Don't forget to take short breaks.";
  } else if (health.percentage >= 40) {
    tip =
      "Your workload is increasing. Try finishing the nearest deadline first.";
  } else {
    tip =
      "Take a break and prioritize your most important tasks.";
  }

  return (
    <HomeCard>
      <Text style={styles.title}>Tips</Text>

      <Text style={styles.tip}>{tip}</Text>
    </HomeCard>
  );
}

const styles = StyleSheet.create({

  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  tip: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});