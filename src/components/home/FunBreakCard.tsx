import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type FunBreakCardProps = {
  navigation: any;
};

type BreakItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bgColor: string;
  iconColor: string;
  onPress: () => void;
};

export default function FunBreakCard({ navigation }: FunBreakCardProps) {
  const items: BreakItem[] = [
    {
      icon: "game-controller",
      label: "Games",
      bgColor: "#FEE2E2",
      iconColor: "#DC2626",
      onPress: () => navigation.navigate("Fun Break"),
    },
    {
      icon: "musical-notes",
      label: "Music",
      bgColor: "#D1FAE5",
      iconColor: "#059669",
      onPress: () => {},
    },
    {
      icon: "videocam",
      label: "Videos",
      bgColor: "#FEF3C7",
      iconColor: "#D97706",
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Fun Break</Text>
      <View style={styles.grid}>
        {items.map((item) => (
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