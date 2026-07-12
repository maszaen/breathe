import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type CustomTextInputProps = TextInputProps;

export default function CustomTextInput(
  props: CustomTextInputProps
) {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={Colors.textSecondary}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: Colors.surface,
    color: Colors.text,
  },
});