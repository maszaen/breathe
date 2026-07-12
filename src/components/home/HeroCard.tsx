import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type HeroCardProps = {
  tasks: Task[];
  username?: string;
};

export default function HeroCard({
  tasks,
  username = "User",
}: HeroCardProps) {
  // --- Greeting logic ---
  const hour = new Date().getHours();
  let greeting = "Welcome";
  let greetingIcon: keyof typeof Ionicons.glyphMap = "sunny-outline";
  if (hour < 12) {
    greeting = "Good Morning";
    greetingIcon = "sunny-outline";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    greetingIcon = "partly-sunny-outline";
  } else {
    greeting = "Good Evening";
    greetingIcon = "moon-outline";
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // --- Mental health ---
  const health = calculateMentalHealth(tasks);

  // --- Tip ---
  let tip = "";
  if (health.percentage >= 80) {
    tip = "Great job! Keep maintaining your healthy habits.";
  } else if (health.percentage >= 60) {
    tip = "You're doing well. Take short breaks between sessions.";
  } else if (health.percentage >= 40) {
    tip = "Finish the nearest deadline first to reduce stress.";
  } else {
    tip = "Take a break and prioritize your most important tasks.";
  }

  return (
    <View style={styles.card}>
      {/* ── Top: Greeting ── */}
      <View style={styles.greetingRow}>
        <View style={styles.greetingLeft}>
          <Text style={styles.dateText}>{dateStr}</Text>
          <Text style={styles.greetingText}>
            {greeting}, {username}
          </Text>
          <Text style={styles.tipText}>{tip}</Text>
        </View>
        <View style={styles.greetingIcon}>
          <Ionicons name={greetingIcon} size={26} color="#FFFFFF" />
        </View>
      </View>

      {/* ── Divider ── */}
      <View style={styles.divider} />

      {/* ── Bottom: Mental Health ── */}
      <View style={styles.healthRow}>
        <View>
          <Text style={styles.healthLabel}>Mental Health</Text>
          <Text style={styles.healthScore}>{health.percentage}%</Text>
        </View>
        <View style={styles.healthRight}>
          <Text style={styles.healthStatus}>{health.status}</Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${health.percentage}%` as any },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: Spacing.lg,
    ...Shadow.sm,
  },

  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },

  greetingLeft: {
    flex: 1,
    marginRight: Spacing.sm,
    gap: 3,
  },

  dateText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "500",
  },

  greetingText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  tipText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "400",
    lineHeight: 17,
    marginTop: 2,
  },

  greetingIcon: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Radius.full,
    padding: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginBottom: Spacing.md,
  },

  healthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.md,
  },

  healthLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
    marginBottom: 2,
  },

  healthScore: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  healthRight: {
    flex: 1,
    gap: 6,
    alignItems: "flex-end",
  },

  healthStatus: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  barTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: Radius.full,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: Radius.full,
  },
});
