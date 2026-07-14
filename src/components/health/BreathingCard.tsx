import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type Props = {
  onPress?: () => void;
};

export default function BreathingCard({ onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="leaf" size={18} color={Colors.success} />
        </View>
        <Text style={styles.title}>Breathing Exercise</Text>
      </View>

      <Text style={styles.description}>
        Take a calm pause and reset your focus with a short breathing session.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onPress}>
        <Ionicons name="play-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Start Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.sm,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    backgroundColor: Colors.successLight,
    borderRadius: Radius.full,
    padding: 7,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  button: {
    backgroundColor: Colors.success,
    borderRadius: Radius.lg,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
