import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

type Props = {
  selected: string;
  onChange: (tab: string) => void;
};

export default function TaskTabs({
  selected,
  onChange,
}: Props) {

  const tabs = [
    "Active",
    "Completed",
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          onPress={() => onChange(tab)}
          style={[
            styles.tab,
            selected === tab &&
              styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === tab &&
                styles.activeText,
            ]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: Colors.primary,
  },

  text: {
    color: Colors.textSecondary,
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});