import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

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

export default function HomeScreen({
  navigation,
}: any) {
  const { tasks } = useTask();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Image
          source={require("../../assets/images/breathe-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <WelcomeCard />

        <MentalHealthCard
          tasks={tasks}
        />

        <UpcomingDeadlineCard
          tasks={tasks}
        />

        <QuickActionGrid
          navigation={navigation}
        />

        <FunBreakCard
          navigation={navigation}
        />

        <TipsCard
          tasks={tasks}
        />
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
    paddingBottom: 120,
    backgroundColor: Colors.background,
  },

  logo: {
    width: 200,
    height: 60,
    alignSelf: "center",
    marginVertical: Spacing.lg,
  },
});