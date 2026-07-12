import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useTask } from "../../context/TaskContext";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

export default function ProfileScreen({ navigation }: any) {
  const { tasks } = useTask();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        {/* ── Hero Card ── */}
        <View style={styles.heroCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrap}>
              <Ionicons name="person" size={32} color={Colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Maszaen</Text>
              <Text style={styles.email}>maszaen@breathe.app</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={18} color="#DC2626" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* ── About / Stats Card ── */}
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.primary }]}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Ongoing</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.success }]}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* ── Settings Card ── */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsCard}>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#F3E8FF" }]}>
                <Ionicons name="moon" size={18} color="#9333EA" />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#D1D5DB", true: Colors.primaryLight }}
              thumbColor={isDarkMode ? Colors.primary : "#fff"}
            />
          </View>
          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#FFE4E6" }]}>
                <Ionicons name="notifications" size={18} color="#E11D48" />
              </View>
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={isNotifEnabled}
              onValueChange={setIsNotifEnabled}
              trackColor={{ false: "#D1D5DB", true: Colors.primaryLight }}
              thumbColor={isNotifEnabled ? Colors.primary : "#fff"}
            />
          </View>
          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="volume-high" size={18} color="#D97706" />
              </View>
              <Text style={styles.settingText}>App Sounds</Text>
            </View>
            <Switch
              value={isSoundEnabled}
              onValueChange={setIsSoundEnabled}
              trackColor={{ false: "#D1D5DB", true: Colors.primaryLight }}
              thumbColor={isSoundEnabled ? Colors.primary : "#fff"}
            />
          </View>

        </View>

        {/* ── Additional Dummy Links ── */}
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#E0F2FE" }]}>
                <Ionicons name="person-circle" size={18} color="#0284C7" />
              </View>
              <Text style={styles.settingText}>Account Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.settingDivider} />
          
          <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: "#ECFDF5" }]}>
                <Ionicons name="shield-checkmark" size={18} color="#059669" />
              </View>
              <Text style={styles.settingText}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>BREATHE v3.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 100,
    gap: Spacing.sm,
  },
  screenTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: 4,
    paddingHorizontal: 4,
  },

  // Hero Card
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.lg,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: Radius.full,
    paddingVertical: 12,
    gap: 6,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },

  // Stats Card
  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    ...Shadow.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },

  // Settings Card
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    ...Shadow.sm,
    paddingHorizontal: Spacing.lg,
    marginTop: 4,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.text,
  },
  settingDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },

  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: Spacing.xl,
    fontWeight: "500",
  },
});