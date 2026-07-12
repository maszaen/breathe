import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type ActionsCardProps = {
  navigation: any;
};

type ActionItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bgColor: string;
  iconColor: string;
  onPress: () => void;
};

export default function ActionsCard({ navigation }: ActionsCardProps) {
  const quickActions: ActionItem[] = [
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
      label: "AI Chat",
      bgColor: "#EDE9FE",
      iconColor: "#7C3AED",
      onPress: () => {},
    },
  ];

  const funBreakItems: ActionItem[] = [
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
      bgColor: Colors.successLight,
      iconColor: Colors.success,
      onPress: () => {},
    },
    {
      icon: "videocam",
      label: "Videos",
      bgColor: Colors.warningLight,
      iconColor: Colors.warning,
      onPress: () => {},
    },
  ];

  const renderRow = (items: ActionItem[]) => (
    <View style={styles.row}>
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <Pressable
            style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
            onPress={item.onPress}
          >
            <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon} size={22} color={item.iconColor} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
          {idx < items.length - 1 && <View style={styles.colDivider} />}
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Quick Actions row */}
      <Text style={styles.sectionLabel}>Quick Actions</Text>
      {renderRow(quickActions)}

      {/* Separator with label */}
      <View style={styles.separator} />
      <Text style={styles.sectionLabel}>Fun Break</Text>

      {/* Fun Break row */}
      {renderRow(funBreakItems)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
    gap: 10,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  item: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
  },

  colDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },

  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
});
