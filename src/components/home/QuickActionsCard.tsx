import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type QuickActionsCardProps = {
  navigation: any;
};

type ActionItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bg: string;
  iconColor: string;
  onPress: () => void;
};

export default function QuickActionsCard({ navigation }: QuickActionsCardProps) {
  const items: ActionItem[] = [
    {
      icon: "add-circle",
      label: "Add Task",
      bg: "#CFFAFE",
      iconColor: "#0891B2",
      onPress: () => navigation.navigate("AddTask"),
    },
    {
      icon: "timer",
      label: "Pomodoro",
      bg: "#FEF3C7",
      iconColor: "#D97706",
      onPress: () => navigation.navigate("Pomodoro"),
    },
    {
      icon: "sparkles",
      label: "AI Chat",
      bg: "#EDE9FE",
      iconColor: "#7C3AED",
      onPress: () => navigation.navigate("AIAssistant"),
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {items.map((item, idx) => (
          <Pressable
            key={item.label}
            style={({ pressed }) => [
              styles.btn,
              pressed && { opacity: 0.82 },
              idx < items.length - 1 && styles.btnBorder,
            ]}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={32} color={item.iconColor} />
            <Text style={[styles.label, { color: item.iconColor }]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
  },

  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },

  btnBorder: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0,0,0,0.07)",
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
});
