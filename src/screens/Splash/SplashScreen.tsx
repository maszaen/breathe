import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

export default function SplashScreen({
  navigation,
}: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        BREATHE
      </Text>

      <Text style={styles.subtitle}>
        Productivity & Mental Health App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
});