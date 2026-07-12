import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type HomeCardProps = {
  children: React.ReactNode;
  style?: object;
};

export default function HomeCard({
  children,
  style,
}: HomeCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6", // Lighter gray separator
  },
});
