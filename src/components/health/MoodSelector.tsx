import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

import { Ionicons } from "@expo/vector-icons";

const moods = [
  {
    icon: "happy",
    label: "Great",
    color: "#10B981", // Success green
  },
  {
    icon: "happy-outline",
    label: "Happy",
    color: "#34D399",
  },
  {
    icon: "ellipse-outline",
    label: "Okay",
    color: "#FBBF24", // Warning yellow
  },
  {
    icon: "sad-outline",
    label: "Sad",
    color: "#F87171", // Danger light
  },
  {
    icon: "sad",
    label: "Stressed",
    color: "#EF4444", // Danger
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("");

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.label}
          activeOpacity={0.8}
          onPress={() => setSelectedMood(mood.label)}
          style={[
            styles.item,
            selectedMood === mood.label && styles.selected,
          ]}
        >
          <Ionicons name={mood.icon as any} size={34} color={selectedMood === mood.label ? mood.color : Colors.textSecondary} />

          <Text
            style={[
              styles.label,
              selectedMood === mood.label && styles.selectedLabel,
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