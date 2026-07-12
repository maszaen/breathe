import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

type Props = {
  onPress: () => void;
};

export default function AddTaskButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons
        name="add"
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.text}>
        Add New Task
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Colors.primary,

    borderRadius: Radius.full,

    paddingHorizontal: Spacing.lg,

    height: 56,

    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 5,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 8,
  },
});