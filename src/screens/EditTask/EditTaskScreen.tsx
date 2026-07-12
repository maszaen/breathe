import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import AuthHeader from "../../components/layout/AuthHeader";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

import { useTask } from "../../context/TaskContext";

export default function EditTaskScreen({
  navigation,
  route,
}: any) {
  const { updateTask } = useTask();

  const task = route.params.task;

  const [taskName, setTaskName] = useState(task.taskName);
  const [course, setCourse] = useState(task.course);

  const [deadline, setDeadline] = useState(task.deadline);
  const [deadlineTime, setDeadlineTime] = useState(
    task.deadlineTime
  );

  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  const onChangeDate = (
    event: any,
    selectedDate?: Date
  ) => {
    setShowDatePicker(false);

    if (!selectedDate) return;

    setDate(selectedDate);

    const day = String(
      selectedDate.getDate()
    ).padStart(2, "0");

    const month = String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0");

    const year = selectedDate.getFullYear();

    setDeadline(`${day}/${month}/${year}`);
  };

  const onChangeTime = (
    event: any,
    selectedTime?: Date
  ) => {
    setShowTimePicker(false);

    if (!selectedTime) return;

    const hour = String(
      selectedTime.getHours()
    ).padStart(2, "0");

    const minute = String(
      selectedTime.getMinutes()
    ).padStart(2, "0");

    setDeadlineTime(`${hour}:${minute}`);
  };

  const handleUpdate = () => {
    updateTask({
      ...task,
      taskName,
      course,
      deadline,
      deadlineTime,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader
        title="Edit Task"
        subtitle="Update your task"
      />

      <View style={styles.form}>
        <CustomTextInput
          value={taskName}
          onChangeText={setTaskName}
        />

        <CustomTextInput
          value={course}
          onChangeText={setCourse}
        />

        <Pressable
          onPress={() =>
            setShowDatePicker(true)
          }
        >
          <View pointerEvents="none">
            <CustomTextInput
              value={deadline}
              editable={false}
            />
          </View>
        </Pressable>

        <Pressable
          onPress={() =>
            setShowTimePicker(true)
          }
        >
          <View pointerEvents="none">
            <CustomTextInput
              value={deadlineTime}
              editable={false}
            />
          </View>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onValueChange={onChangeDate}
            onDismiss={() => setShowDatePicker(false)}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            is24Hour={true}
            onValueChange={onChangeTime}
            onDismiss={() => setShowTimePicker(false)}
          />
        )}

        <PrimaryButton
          title="Update Task"
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  form: {
    gap: Spacing.md,
  },
});