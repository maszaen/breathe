import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,

    height: 52,

    justifyContent: "center",

    alignItems: "center",

    borderRadius: Radius.md,

    marginTop: Spacing.md,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.6,
  },
});