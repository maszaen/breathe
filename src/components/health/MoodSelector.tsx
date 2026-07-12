import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

const moods = [
  {
    emoji: "😁",
    label: "Great",
  },
  {
    emoji: "😊",
    label: "Happy",
  },
  {
    emoji: "😐",
    label: "Okay",
  },
  {
    emoji: "😔",
    label: "Sad",
  },
  {
    emoji: "😫",
    label: "Stressed",
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] =
    useState("");

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.label}
          activeOpacity={0.8}
          onPress={() =>
            setSelectedMood(mood.label)
          }
          style={[
            styles.item,
            selectedMood === mood.label &&
              styles.selected,
          ]}
        >
          <Text style={styles.emoji}>
            {mood.emoji}
          </Text>

          <Text
            style={[
              styles.label,
              selectedMood === mood.label &&
                styles.selectedLabel,
            ]}
          >
            {mood.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
  },

  selected: {
    backgroundColor: "#EEF6FF",
  },

  emoji: {
    fontSize: 34,
  },

  label: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  selectedLabel: {
    color: Colors.primary,
    fontWeight: "700",
  },
});