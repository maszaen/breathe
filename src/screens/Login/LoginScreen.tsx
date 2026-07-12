import React from "react";
import {
  Image,
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

export default function LoginScreen({ navigation }: any) {
  return (
    <AuthLayout>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/breathe-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <AuthHeader
        title="Sign In"
        subtitle="Sign in to your account"
      />

      <View style={styles.form}>
        <CustomTextInput placeholder="Email" />

        <CustomTextInput
          placeholder="Password"
          secureTextEntry
        />

        <Pressable>
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>
        </Pressable>

        <PrimaryButton
          title="Sign In"
          onPress={() => navigation.replace("Main")}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.secondaryButtonText}>
            Register Account
          </Text>
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>
            Continue with Google
          </Text>
        </Pressable>

        <Pressable style={styles.socialButton}>
          <Text style={styles.socialButtonText}>
            Continue with Apple
          </Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  logo: {
    width: 220,
    height: 60,
  },

  form: {
    gap: Spacing.md,
  },

  forgotPassword: {
    textAlign: "right",
    color: Colors.primary,
    ...Typography.caption,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.sm,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },

  orText: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
    ...Typography.caption,
  },

  secondaryButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: Colors.primary,
    ...Typography.body,
    fontWeight: "700",
  },

  socialButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface,
  },

  socialButtonText: {
    color: Colors.text,
    ...Typography.body,
  },
});