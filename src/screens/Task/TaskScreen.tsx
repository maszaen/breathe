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

export default function TaskScreen({
  navigation,
}: any) {
  const {
    tasks,
    toggleTask,
    deleteTask,
  } = useTask();

  const [selectedTab, setSelectedTab] =
    useState("Active");

  const [expandedSection, setExpandedSection] =
    useState<string | null>(null);

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : completed / tasks.length;

  const percentage = Math.round(
    progress * 100
  );

  const activeSections =
    selectedTab === "Active"
      ? groupTasks(tasks)
      : [];

  React.useEffect(() => {
    if (
      activeSections.length > 0 &&
      !expandedSection
    ) {
      setExpandedSection(
        activeSections[0].title
      );
    }
  }, [activeSections]);

  const toggleSection = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(
      expandedSection === title ? null : title
    );
  };

  const visibleSections = activeSections.map(section => ({
    ...section,
    data: expandedSection === section.title ? section.data : []
  }));

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const activeTasks = tasks.filter(
    (task) => !task.completed
  );

  const activeTaskCount = activeTasks.length;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Task List
          </Text>

          <Text style={styles.subtitle}>
            {completed} of {tasks.length} Tasks Completed
          </Text>

          <Text style={styles.percentage}>
            {percentage}%
          </Text>

          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>

          <TaskTabs
            selected={selectedTab}
            onChange={setSelectedTab}
          />
        </View>

        {selectedTab === "Active" ? (
          <SectionList
            sections={visibleSections}
            keyExtractor={(item) =>
              item.id.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 140,
            }}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  No Active Tasks
                </Text>

                <Text style={styles.emptySubtitle}>
                  Create your first task to get started.
                </Text>

                <View style={styles.emptyButton}>
                  <AddTaskButton
                    onPress={() =>
                      navigation.navigate("AddTask")
                    }
                  />
                </View>
              </View>
            }
            renderSectionHeader={({ section }) => (
              <TouchableOpacity
                onPress={() => toggleSection(section.title)}
                style={styles.sectionHeader}
              >
                <View style={styles.sectionRow}>

                  <Ionicons
                    name={
                      expandedSection === section.title
                        ? "chevron-down"
                        : "chevron-forward"
                    }
                    size={18}
                    color={section.color}
                    style={styles.sectionIcon}
                  />

                  <Text
                    style={[
                      styles.sectionTitle,
                      {
                        color: section.color,
                      },
                    ]}
                  >
                    {section.title} ({section.data.length})
                  </Text>

                </View>
              </TouchableOpacity>
            )}
            renderItem={({ item, section }) => {
              return (
                <TaskCard
                  task={item}
                  onPress={() =>
                    navigation.navigate(
                      "EditTask",
                      { task: item }
                    )
                  }
                  onToggle={() =>
                    toggleTask(item.id)
                  }
                  onDelete={() =>
                    Alert.alert(
                      "Delete Task",
                      `Are you sure you want to delete "${item.taskName}"?`,
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () =>
                            deleteTask(item.id),
                        },
                      ]
                    )
                  }
                  onStartFocus={() =>
                    navigation.navigate("Pomodoro")
                  }
                />
              );
            }}
          />
        ) : (
          <FlatList
            data={completedTasks}
            keyExtractor={(item) =>
              item.id.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyTitle}>
                  No Completed Tasks
                </Text>

                <Text style={styles.emptySubtitle}>
                  Complete a task to see it here.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onPress={() =>
                  navigation.navigate(
                    "EditTask",
                    { task: item }
                  )
                }
                onToggle={() =>
                  toggleTask(item.id)
                }
                onDelete={() =>
                  Alert.alert(
                    "Delete Task",
                    `Are you sure you want to delete "${item.taskName}"?`,
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () =>
                          deleteTask(item.id),
                      },
                    ]
                  )
                }
                onStartFocus={() =>
                  navigation.navigate("Pomodoro")
                }
              />
            )}
          />
        )}
      </SafeAreaView>
      {selectedTab === "Active" &&
        activeTaskCount > 0 && (
          <FloatingAddButton
            onPress={() =>
              navigation.navigate("AddTask")
            }
          />
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: Colors.textSecondary,
  },

  percentage: {
    marginTop: 6,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  progressContainer: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    marginTop: 14,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: Colors.success,
    borderRadius: 999,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  empty: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyButton: {
    alignSelf: "stretch",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  emptySubtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    marginTop: 10,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionIcon: {
    marginRight: 6,
  },
});