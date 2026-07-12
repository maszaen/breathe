import React from "react";
import {
  View,
 Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

type WelcomeCardProps = {
  username?: string;
};

export default function WelcomeCard({
  username = "User",
}: WelcomeCardProps) {
  const hour = new Date().getHours();
  let greeting = "Welcome";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        👋 {greeting}, {username}
      </Text>

      <Text style={styles.subtitle}>
        Let's start your productive journey today.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  title: {
    ...Typography.h2,
    color: Colors.text,
  },

  subtitle: {
    marginTop: Spacing.sm,
    ...Typography.body,
    color: Colors.textSecondary,
  },
});