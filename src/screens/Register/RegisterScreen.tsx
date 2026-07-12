import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AuthLayout from "../../components/layout/AuthLayout";
import AuthHeader from "../../components/layout/AuthHeader";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export default function RegisterScreen({
  navigation,
}: any) {
  return (
    <AuthLayout>
      <AuthHeader
        title="Register"
        subtitle="Create your BREATHE account"
      />

      <View style={styles.form}>
        <CustomTextInput placeholder="Full Name" />

        <CustomTextInput placeholder="Email" />

        <CustomTextInput
          placeholder="Password"
          secureTextEntry
        />

        <CustomTextInput
          placeholder="Confirm Password"
          secureTextEntry
        />

        <PrimaryButton
          title="Register"
          onPress={() => navigation.goBack()}
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