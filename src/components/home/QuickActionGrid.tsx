import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import HomeCard from "./HomeCard";

type QuickActionGridProps = {
  navigation: any;
};

export default function QuickActionGrid({
  navigation,
}: QuickActionGridProps) {
  return (
    <HomeCard style={styles.container}>
      <Text style={styles.title}>
        Quick Action
      </Text>

      <View style={styles.grid}>
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate("AddTask")
          }
        >
          <Ionicons
            name="add-circle"
            size={28}
            color={Colors.text}
            style={styles.icon}
          />
          <Text style={styles.label}>
            Add Task
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => {}}
        >
          <Ionicons
            name="timer"
            size={28}
            color={Colors.text}
            style={styles.icon}
          />
          <Text style={styles.label}>
            Pomodoro
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => {}}
        >
          <Ionicons
            name="sparkles"
            size={28}
            color={Colors.text}
            style={styles.icon}
          />
          <Text style={styles.label}>
            AI Assistant
          </Text>
        </Pressable>
      </View>
    </HomeCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    marginHorizontal: 4,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  icon: {
    marginBottom: Spacing.sm,
  },

  label: {
    ...Typography.caption,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "600",
  },
});