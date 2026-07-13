import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from "../../config/firebase";

import AuthLayout from "../../components/layout/AuthLayout";
import AuthHeader from "../../components/layout/AuthHeader";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";
import { RootStackScreenProps } from "../../types/navigation";

export default function LoginScreen({ navigation }: RootStackScreenProps<"Login">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Google Sign-In
  React.useEffect(() => {
    GoogleSignin.configure({
      // TODO: Replace with your actual Web Client ID from Firebase Console
      // webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      
      // Try to get the idToken
      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await signInWithCredential(auth, googleCredential);
      
      navigation.replace("Main", { screen: "Home" });
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for AuthContext to pick up the state change, or simply replace to Main
      navigation.replace("Main", { screen: "Home" });
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

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

        <Pressable>
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>
        </Pressable>

        <PrimaryButton
          title={loading ? "Signing in..." : "Sign In"}
          onPress={handleLogin}
          disabled={loading}
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

        <Pressable 
          style={styles.socialButton}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.socialButtonText}>
            {loading ? "Please wait..." : "Continue with Google"}
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