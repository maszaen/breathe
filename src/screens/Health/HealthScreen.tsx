import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import MentalHealthMeter from "../../components/health/MentalHealthMeter";
import AnalysisCard from "../../components/health/AnalysisCard";
import RecommendationCard from "../../components/health/RecommendationCard";
import BreathingCard from "../../components/health/BreathingCard";
import { BottomTabScreenPropsType } from "../../types/navigation";

export default function HealthScreen({ navigation }: BottomTabScreenPropsType<"Health">) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Health</Text>
          <Text style={styles.subtitle}>Track your mental wellness</Text>
        </View>

        <MentalHealthMeter />
        <AnalysisCard />
        <RecommendationCard />
        <BreathingCard onPress={() => navigation.navigate("Breathing")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 120,
    gap: 12,
  },

  header: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});