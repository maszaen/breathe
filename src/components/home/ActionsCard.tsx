import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
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
  const allItems: ActionItem[] = [
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

  const row1 = allItems.slice(0, 3);
  const row2 = allItems.slice(3);

  const renderRow = (items: ActionItem[]) => (
    <View style={styles.row}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          style={({ pressed }) => [styles.item, pressed && { opacity: 0.7 }]}
          onPress={item.onPress}
        >
          <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
            <Ionicons name={item.icon} size={22} color={item.iconColor} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={styles.card}>
      {renderRow(row1)}
      {renderRow(row2)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    // Top corners flat (connected to HeroCard above)
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: 4,
  },

  row: {
    flexDirection: "row",
  },

  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 6,
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
});
