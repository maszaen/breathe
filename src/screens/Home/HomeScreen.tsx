import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import HeroCard from "../../components/home/HeroCard";
import QuickActionsCard from "../../components/home/QuickActionsCard";
import FunBreakCard from "../../components/home/FunBreakCard";
import UpcomingDeadlineCard from "../../components/home/UpcomingDeadlineCard";

import { useTask } from "../../context/TaskContext";

import { Colors, Shadow } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function HomeScreen({ navigation }: any) {
  const { tasks } = useTask();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Brand logo */}
        <Image
          source={require("../../assets/images/breathe-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Hero card — self-contained shadow */}
        <HeroCard tasks={tasks} />

        {/* Quick Actions — shadow wrapper (overflow:hidden needs separate shadow) */}
        <View style={styles.cardShadow}>
          <QuickActionsCard navigation={navigation} />
          <FunBreakCard navigation={navigation} />
        </View>

        {/* Upcoming deadline — self-contained shadow */}
        <UpcomingDeadlineCard tasks={tasks} navigation={navigation} />
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
    paddingTop: Spacing.xs,
    paddingBottom: 120,
    gap: 12,
  },

  logo: {
    width: 150,
    height: 64,
    alignSelf: "flex-start",
  },

  // Shadow lives here so overflow:hidden on card doesn't clip iOS shadow
  cardShadow: {
    borderRadius: 20,
    ...Shadow.sm,
    backgroundColor: Colors.surface,
  },
});