import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTask } from "../../context/TaskContext";

import TaskCard from "../../components/cards/TaskCard";
import AddTaskButton from "../../components/buttons/AddTaskButton";
import FloatingAddButton from "../../components/buttons/FloatingAddButton";
import TaskTabs from "../../components/task/TaskTabs";

import { groupTasks } from "../../utils/taskGrouping";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TaskScreen({ navigation }: any) {
  const { tasks, toggleTask, deleteTask } = useTask();

  const [selectedTab, setSelectedTab] = useState("Active");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length === 0 ? 0 : completed / tasks.length;
  const percentage = Math.round(progress * 100);

  const activeSections =
    selectedTab === "Active" ? groupTasks(tasks) : [];

  React.useEffect(() => {
    if (activeSections.length > 0 && !expandedSection) {
      setExpandedSection(activeSections[0].title);
    }
  }, [activeSections.length]);

  const toggleSection = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === title ? null : title);
  };

  const visibleSections = activeSections.map((section) => ({
    ...section,
    data: expandedSection === section.title ? section.data : [],
  }));

  const completedTasks = tasks.filter((t) => t.completed);
  const activeTasks = tasks.filter((t) => !t.completed);

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>My Tasks</Text>
              <Text style={styles.subtitle}>
                {completed} of {tasks.length} completed
              </Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{percentage}%</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` as any },
              ]}
            />
          </View>

          {/* Tabs */}
          <TaskTabs selected={selectedTab} onChange={setSelectedTab} />
        </View>

        {/* ── Content ── */}
        {selectedTab === "Active" ? (
          <SectionList
            sections={visibleSections}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
            ListEmptyComponent={
              <View style={styles.empty}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons
                    name="checkmark-done-circle-outline"
                    size={48}
                    color={Colors.primary}
                  />
                </View>
                <Text style={styles.emptyTitle}>No Active Tasks</Text>
                <Text style={styles.emptySubtitle}>
                  Create your first task to get started.
                </Text>
                <View style={{ marginTop: 8 }}>
                  <AddTaskButton
                    onPress={() => navigation.navigate("AddTask")}
                  />
                </View>
              </View>
            }
            renderSectionHeader={({ section }) => (
              <TouchableOpacity
                onPress={() => toggleSection(section.title)}
                style={styles.sectionHeader}
                activeOpacity={0.7}
              >
                <View style={styles.sectionLeft}>
                  <View
                    style={[
                      styles.sectionDot,
                      { backgroundColor: section.color },
                    ]}
                  />
                  <Text
                    style={[styles.sectionTitle, { color: section.color }]}
                  >
                    {section.title}
                  </Text>
                  <View
                    style={[
                      styles.sectionCount,
                      { backgroundColor: section.color + "20" },
                    ]}
                  >
                    <Text
                      style={[styles.sectionCountText, { color: section.color }]}
                    >
                      {section.data.length}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={
                    expandedSection === section.title
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={16}
                  color={section.color}
                />
              </TouchableOpacity>
            )}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onPress={() =>
                  navigation.navigate("EditTask", { task: item })
                }
                onToggle={() => toggleTask(item.id)}
                onDelete={() => handleDelete(item.id, item.taskName)}
                onStartFocus={() => navigation.navigate("Pomodoro")}
              />
            )}
          />
        ) : (
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.empty}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons
                    name="hourglass-outline"
                    size={48}
                    color={Colors.textSecondary}
                  />
                </View>
                <Text style={styles.emptyTitle}>No Completed Tasks</Text>
                <Text style={styles.emptySubtitle}>
                  Complete a task to see it here.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onPress={() =>
                  navigation.navigate("EditTask", { task: item })
                }
                onToggle={() => toggleTask(item.id)}
                onDelete={() => handleDelete(item.id, item.taskName)}
                onStartFocus={() => navigation.navigate("Pomodoro")}
              />
            )}
          />
        )}
      </SafeAreaView>

      {selectedTab === "Active" && activeTasks.length > 0 && (
        <FloatingAddButton onPress={() => navigation.navigate("AddTask")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    gap: 12,
    backgroundColor: Colors.background,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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

  percentBadge: {
    backgroundColor: Colors.primary + "15",
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  percentText: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
  },

  progressTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.success,
    borderRadius: Radius.full,
  },

  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 140,
    paddingTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 4,
    marginTop: 8,
  },

  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  sectionCount: {
    borderRadius: Radius.full,
    paddingHorizontal: 7,
    paddingVertical: 1,
  },

  sectionCountText: {
    fontSize: 12,
    fontWeight: "700",
  },

  empty: {
    marginTop: 60,
    alignItems: "center",
    gap: 8,
  },

  emptyIconWrap: {
    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});