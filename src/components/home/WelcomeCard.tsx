import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type WelcomeCardProps = {
  username?: string;
};

export default function WelcomeCard({ username = "User" }: WelcomeCardProps) {
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

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.dateText}>{dateStr}</Text>
          <Text style={styles.greetingText}>
            {greeting}, {username}
          </Text>
        </View>
        <View style={styles.iconWrap}>
          <Ionicons name={greetingIcon} size={28} color={Colors.primary} />
        </View>
      </View>
      <Text style={styles.subtitle}>
        Let's stay productive and healthy today.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: Spacing.lg,
    gap: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  dateText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
    marginBottom: 2,
  },

  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  iconWrap: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: Radius.full,
    padding: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
  },
});