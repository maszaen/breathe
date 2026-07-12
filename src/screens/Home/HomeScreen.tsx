import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeCard from "../../components/home/WelcomeCard";
import MentalHealthCard from "../../components/home/MentalHealthCard";
import UpcomingDeadlineCard from "../../components/home/UpcomingDeadlineCard";
import QuickActionGrid from "../../components/home/QuickActionGrid";
import FunBreakCard from "../../components/home/FunBreakCard";
import TipsCard from "../../components/home/TipsCard";

import { useTask } from "../../context/TaskContext";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function HomeScreen({ navigation }: any) {
  const { tasks } = useTask();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.brandName}>breathe</Text>
        </View>

        <WelcomeCard />

        <MentalHealthCard tasks={tasks} />

        <UpcomingDeadlineCard tasks={tasks} />

        <QuickActionGrid navigation={navigation} />

        <FunBreakCard navigation={navigation} />

        <TipsCard tasks={tasks} />
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

  pageHeader: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xs,
  },

  brandName: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: -0.5,
  },
});