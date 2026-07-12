import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type HomeCardProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function HomeCard({ children, style }: HomeCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    ...Shadow.sm,
  },
});
