import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = {
  selected: string;
  onChange: (tab: string) => void;
};

export default function TaskTabs({ selected, onChange }: Props) {
  const tabs = ["Active", "Completed"];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          onPress={() => onChange(tab)}
          style={[styles.tab, selected === tab && styles.activeTab]}
        >
          <Text style={[styles.text, selected === tab && styles.activeText]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EAEEF2",
    borderRadius: Radius.lg,
    padding: 3,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 9,
    borderRadius: 13,
  },

  activeTab: {
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  activeText: {
    color: Colors.primary,
    fontWeight: "700",
  },
});