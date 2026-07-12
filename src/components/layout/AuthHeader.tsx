import { View, Text, StyleSheet } from "react-native";
import { Typography } from "../../theme/typography";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={[Typography.h1, styles.title]}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },

  title: {
    color: Colors.text,
  },

  subtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    fontSize: 16,
  },
});