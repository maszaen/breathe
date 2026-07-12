import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useTask } from "../../context/TaskContext";
import { calculateMentalHealth } from "../../utils/mentalHealth";

import { Colors } from "../../theme/colors";

export default function MentalHealthMeter() {

  const { tasks } = useTask();

  const {
    percentage,
    status,
    color,
  } = calculateMentalHealth(tasks);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Mental Health
      </Text>

      <Text style={styles.score}>
        {percentage}%
      </Text>

      <View style={styles.bar}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <Text
        style={[
          styles.status,
          {
            color,
          },
        ]}
      >
        {status}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  score: {
    marginTop: 10,
    fontSize: 42,
    fontWeight: "700",
    color: Colors.primary,
  },

  bar: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    marginTop: 14,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
  },

  status: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },

});