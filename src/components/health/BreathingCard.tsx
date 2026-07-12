import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export default function BreathingCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Breathing Exercise
      </Text>

      <Text style={styles.description}>
        Take a calm pause and reset your focus with a short breathing session.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          Start Session
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
  },

  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },

  buttonText: {
    ...Typography.body,
    color: Colors.surface,
    fontWeight: "700",
  },
});
