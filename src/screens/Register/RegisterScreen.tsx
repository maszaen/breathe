import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "@react-native-firebase/auth";
import { auth } from "../../config/firebase";

import AuthLayout from "../../components/layout/AuthLayout";
import AuthHeader from "../../components/layout/AuthHeader";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { RootStackScreenProps } from "../../types/navigation";

export default function RegisterScreen({ navigation }: RootStackScreenProps<"Register">) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (fullName.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Let AuthContext pick up state change or replace directly
      navigation.replace("Main", { screen: "Home" });
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Register"
        subtitle="Create your BREATHE account"
      />

      <View style={styles.form}>
        <CustomTextInput 
          placeholder="Full Name" 
          value={fullName}
          onChangeText={setFullName}
        />

        <CustomTextInput 
          placeholder="Email" 
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomTextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <PrimaryButton
          title={loading ? "Registering..." : "Register"}
          onPress={handleRegister}
          disabled={loading}
        />

        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginText}>
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: Spacing.md,
  },

  loginText: {
    ...Typography.body,
    color: Colors.primary,
    textAlign: "center",
    marginTop: Spacing.md,
    fontWeight: "700",
  },
});