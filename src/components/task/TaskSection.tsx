import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import TaskCard from "../cards/TaskCard";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

type Props = {
  title: string;
  tasks: any[];
  onTaskPress: (task: any) => void;
  onTaskToggle: (id: number) => void;
  onTaskDelete: (task: any) => void;
};

export default function TaskSection({
  title,
  tasks,
  onTaskPress,
  onTaskToggle,
  onTaskDelete,
}: Props) {

  if (tasks.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onPress={() => onTaskPress(task)}
          onToggle={() =>
            onTaskToggle(task.id)
          }
          onDelete={() =>
            onTaskDelete(task)
          }
          onStartFocus={() => {
            // Pomodoro flow is handled via the task screen entry point.
          }}
        />
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
});