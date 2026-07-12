import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import AuthHeader from "../../components/layout/AuthHeader";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

import { useTask } from "../../context/TaskContext";

export default function AddTaskScreen({
  navigation,
}: any) {
  const { addTask } = useTask();

  const [taskName, setTaskName] = useState("");
  const [course, setCourse] = useState("");

  const [date, setDate] = useState(new Date());

  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

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

    setDeadline(
      `${day}/${month}/${year}`
    );
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

  const handleSave = () => {
    if (
      taskName.trim() === "" ||
      course.trim() === "" ||
      deadline.trim() === "" ||
      deadlineTime.trim() === ""
    ) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all fields before saving."
      );
      return;
    }

    addTask({
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
        title="Add Task"
        subtitle="Create a new task"
      />

      <View style={styles.form}>
        <CustomTextInput
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />

        <CustomTextInput
          placeholder="Course"
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
              placeholder="Deadline"
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
              placeholder="Deadline Time"
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
          title="Save Task"
          onPress={handleSave}
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