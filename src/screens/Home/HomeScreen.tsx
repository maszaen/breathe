import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HeroCard from "../../components/home/HeroCard";
import UpcomingDeadlineCard from "../../components/home/UpcomingDeadlineCard";
import ActionsCard from "../../components/home/ActionsCard";

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

        <HeroCard tasks={tasks} />

        <UpcomingDeadlineCard tasks={tasks} />

        <ActionsCard navigation={navigation} />
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