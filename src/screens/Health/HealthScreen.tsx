import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import MentalHealthMeter from "../../components/health/MentalHealthMeter";
import AnalysisCard from "../../components/health/AnalysisCard";
import RecommendationCard from "../../components/health/RecommendationCard";
import BreathingCard from "../../components/health/BreathingCard";

function HealthSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export default function HealthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Health</Text>
        </View>

        <HealthSection title="Mental Health Meter">
          <MentalHealthMeter />
        </HealthSection>

        <HealthSection title="Analysis">
          <AnalysisCard />
        </HealthSection>

        <HealthSection title="Recommendation">
          <RecommendationCard />
        </HealthSection>

        <HealthSection title="Breathing Exercise">
          <BreathingCard />
        </HealthSection>
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
    paddingBottom: Spacing.xl * 2,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  title: {
    ...Typography.h1,
    color: Colors.primary,
  },

  section: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: Spacing.md,
  },

  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
  },

  card: {
    padding: Spacing.lg,
  },
});