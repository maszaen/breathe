import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../context/TaskContext";
import { sortTasksByDeadline, getDeadlineStatus } from "../../utils/deadline";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";

type UpcomingDeadlineCardProps = {
  tasks: Task[];
  navigation: any;
};

export default function UpcomingDeadlineCard({ tasks, navigation }: UpcomingDeadlineCardProps) {
  const upcomingTasks = sortTasksByDeadline(tasks.filter((t) => !t.completed));
  const displayTasks = upcomingTasks.slice(0, 4);

  const handleTaskPress = () => {
    navigation.navigate("Main", { screen: "Task" });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrap}>
            <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Upcoming Deadlines</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{upcomingTasks.length}</Text>
        </View>
      </View>

      {displayTasks.length > 0 ? (
        <View style={styles.list}>
          {displayTasks.map((task, index) => {
            const status = getDeadlineStatus(task.deadline, task.deadlineTime);
            return (
              <TouchableOpacity
                key={task.id}
                style={[
                  styles.taskItem,
                  index < displayTasks.length - 1 && styles.taskBorder,
                ]}
                onPress={handleTaskPress}
                activeOpacity={0.7}
              >
                <View style={styles.taskInfo}>
                  <Text style={styles.taskName} numberOfLines={1}>
                    {task.taskName}
                  </Text>
                  <Text style={styles.course} numberOfLines={1}>
                    {task.course}
                  </Text>
                </View>

                <View style={styles.taskMeta}>
                  <Text style={[styles.statusText, { color: status.color }]}>
                    {status.text}
                  </Text>
                  <Text style={styles.timeText}>
                    {task.deadlineTime}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {upcomingTasks.length > 4 && (
            <TouchableOpacity style={styles.viewMoreBtn} onPress={handleTaskPress} activeOpacity={0.7}>
              <Text style={styles.viewMoreText}>Go to tasks</Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.emptyWrap}>
          <Ionicons name="checkmark-circle-outline" size={32} color={Colors.success} />
          <Text style={styles.emptyText}>No upcoming tasks</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    ...Shadow.sm,
    gap: Spacing.md,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    padding: 6,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  badgeWrap: {
    backgroundColor: "#F3F4F6",
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  list: {
    marginTop: 4,
  },

  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },

  taskBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  taskInfo: {
    flex: 1,
    gap: 2,
  },

  taskName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },

  course: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  taskMeta: {
    alignItems: "flex-end",
    gap: 2,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  timeText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  viewMoreBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spacing.md,
    marginTop: Spacing.xs,
    gap: 4,
  },

  viewMoreText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
  },

  emptyWrap: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
    gap: 6,
  },

  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});