import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type QuickActionGridProps = {
  navigation: any;
};

type ActionItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bgColor: string;
  iconColor: string;
  onPress: () => void;
};

export default function QuickActionGrid({ navigation }: QuickActionGridProps) {
  const actions: ActionItem[] = [
    {
      icon: "add-circle",
      label: "Add Task",
      bgColor: Colors.primaryLight,
      iconColor: Colors.primaryDark,
      onPress: () => navigation.navigate("AddTask"),
    },
    {
      icon: "timer",
      label: "Pomodoro",
      bgColor: Colors.warningLight,
      iconColor: Colors.warning,
      onPress: () => navigation.navigate("Pomodoro"),
    },
    {
      icon: "sparkles",
      label: "AI Assistant",
      bgColor: "#EDE9FE",
      iconColor: "#7C3AED",
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((item) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.item,
              pressed && { opacity: 0.75 },
            ]}
            onPress={item.onPress}
          >
            <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon} size={26} color={item.iconColor} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.md,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  grid: {
    flexDirection: "row",
    gap: 10,
  },

  item: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
});