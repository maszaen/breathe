import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { usePomodoro } from "../../context/PomodoroContext";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { Typography } from "../../theme/typography";

// -- DUMMY DATA --
const MODAL_DATA: any = {
  Games: [
    { id: "1", title: "Mobile Legends", img: "https://ui-avatars.com/api/?name=ML&background=0D8ABC&color=fff&size=128" },
    { id: "2", title: "PUBG Mobile", img: "https://ui-avatars.com/api/?name=PUBG&background=F59E0B&color=fff&size=128" },
    { id: "3", title: "Minecraft", img: "https://ui-avatars.com/api/?name=MC&background=10B981&color=fff&size=128" },
  ],
  Music: [
    { id: "1", title: "Spotify", img: "https://ui-avatars.com/api/?name=SP&background=10B981&color=fff&size=128" },
    { id: "2", title: "JOOX", img: "https://ui-avatars.com/api/?name=JX&background=10B981&color=fff&size=128" },
    { id: "3", title: "YouTube Music", img: "https://ui-avatars.com/api/?name=YM&background=EF4444&color=fff&size=128" },
  ],
  Videos: [
    { id: "1", title: "YouTube", img: "https://ui-avatars.com/api/?name=YT&background=EF4444&color=fff&size=128" },
    { id: "2", title: "TikTok", img: "https://ui-avatars.com/api/?name=TK&background=000&color=fff&size=128" },
    { id: "3", title: "SnackVideo", img: "https://ui-avatars.com/api/?name=SV&background=F59E0B&color=fff&size=128" },
  ],
  Relaxation: [
    { id: "1", title: "Deep Breathing", icon: "leaf" },
    { id: "2", title: "Stretching", icon: "body" },
    { id: "3", title: "Meditation", icon: "water" },
  ],
};

const GRID_ITEMS = [
  { label: "Games", icon: "game-controller", bg: "#FEE2E2", iconColor: "#DC2626" },
  { label: "Music", icon: "musical-notes", bg: "#D1FAE5", iconColor: "#059669" },
  { label: "Videos", icon: "videocam", bg: "#FFF7ED", iconColor: "#EA580C" },
  { label: "Relaxation", icon: "leaf", bg: "#E0E7FF", iconColor: "#4F46E5" },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function FunBreakScreen({ navigation }: any) {
  const { sessionType, isRunning, remainingSeconds } = usePomodoro();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Local Break Timer Logic
  const [breakRunning, setBreakRunning] = useState(false);
  const [breakRemaining, setBreakRemaining] = useState(5 * 60);
  const [isEditingBreak, setIsEditingBreak] = useState(false);
  const [tempBreakMin, setTempBreakMin] = useState("5");

  useEffect(() => {
    if (!breakRunning) return;
    const interval = setInterval(() => {
      setBreakRemaining((prev) => {
        if (prev <= 1) {
          setBreakRunning(false);
          return 5 * 60; // Reset after complete
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breakRunning]);

  const handleBreakTimerPress = () => {
    if (!breakRunning) {
      setTempBreakMin(String(Math.floor(breakRemaining / 60)));
      setIsEditingBreak(true);
    }
  };

  const handleBreakTimerSubmit = () => {
    setIsEditingBreak(false);
    const min = parseInt(tempBreakMin, 10);
    if (!isNaN(min) && min > 0) {
      setBreakRemaining(min * 60);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(500)).current;

  const openModal = (category: string) => {
    setActiveCategory(category);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  const handleHeroPress = () => {
    navigation.navigate("Pomodoro");
  };

  // Hero Card states
  const showHero = sessionType !== "idle";
  const isFocus = sessionType === "focus";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Fun Break</Text>

        {/* ── Local Break Timer Card ── */}
        <View style={styles.sessionCard}>
          <View style={[styles.badgeLocal, styles.badgeBreak]}>
            <Ionicons name="cafe" size={14} color={Colors.success} />
            <Text style={[styles.badgeTextLocal, { color: Colors.success }]}>
              Break Time
            </Text>
          </View>

          <Text style={styles.taskName}>Recharge before the next sprint</Text>

          <View style={styles.timerWrap}>
            {isEditingBreak ? (
              <TextInput
                style={[styles.timerLocal, styles.timerInput, { color: Colors.success }]}
                value={tempBreakMin}
                onChangeText={setTempBreakMin}
                keyboardType="number-pad"
                autoFocus
                onBlur={handleBreakTimerSubmit}
                onSubmitEditing={handleBreakTimerSubmit}
                maxLength={3}
              />
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={handleBreakTimerPress} disabled={breakRunning}>
                <Text style={[styles.timerLocal, { color: Colors.success }]}>
                  {formatTime(breakRemaining)}
                </Text>
              </TouchableOpacity>
            )}
            <Text style={styles.timerLabel}>break remaining (tap to edit)</Text>
          </View>
{/* 
          <Text style={styles.caption}>
            Use this time to reset. Your brain needs a quick pause.
          </Text> */}

          <View style={styles.btnRow}>
            {breakRemaining === 5 * 60 && !breakRunning ? (
              <TouchableOpacity
                style={[styles.btnPrimary, { backgroundColor: Colors.success }]}
                onPress={() => setBreakRunning(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="play" size={18} color="#fff" />
                <Text style={styles.btnPrimaryText}>Start Break</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.btnPrimary, { backgroundColor: Colors.success }]}
                  onPress={() => setBreakRunning(!breakRunning)}
                  activeOpacity={0.85}
                >
                  <Ionicons name={breakRunning ? "pause" : "play"} size={18} color="#fff" />
                  <Text style={styles.btnPrimaryText}>
                    {breakRunning ? "Pause" : "Resume"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btnSecondary, breakRunning && { opacity: 0.5 }]}
                  onPress={() => {
                    setBreakRunning(false);
                    setBreakRemaining(5 * 60);
                  }}
                  activeOpacity={0.85}
                  disabled={breakRunning}
                >
                  <Text style={styles.btnSecondaryText}>End Break</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* ── Pomodoro Hero Card (Shortcut) ── */}
        <TouchableOpacity 
          style={showHero ? [styles.heroCardActive, { marginTop: 16 }] : [styles.heroCard, { marginTop: 16 }]} 
          activeOpacity={0.8}
          onPress={handleHeroPress}
        >
          {showHero ? (
            <View style={styles.heroActiveInner}>
              <View style={[styles.badge, isFocus ? styles.badgeFocus : styles.badgeBreak]}>
                <Ionicons name={isFocus ? "flash" : "cafe"} size={14} color={isFocus ? Colors.primary : Colors.success} />
                <Text style={[styles.badgeText, { color: isFocus ? Colors.primary : Colors.success }]}>
                  {isFocus ? "Focusing" : "Break"}
                </Text>
              </View>
              <Text style={[styles.heroTimerHuge, { color: isFocus ? Colors.primary : Colors.success }]}>
                {formatTime(remainingSeconds)}
              </Text>
              <Text style={styles.heroSubActive}>
                {isRunning ? "Timer is running" : "Timer is paused"}
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.heroLeft}>
                <View style={[styles.heroIconWrap, { backgroundColor: Colors.primaryLight }]}>
                  <Ionicons name="timer" size={20} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.heroTitle}>Pomodoro Ready</Text>
                  <Text style={styles.heroSub}>Start a focus session</Text>
                </View>
              </View>

              <View style={styles.heroRight}>
                <Text style={[styles.heroTimer, { color: Colors.textSecondary }]}>
                  25:00
                </Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} style={{ marginTop: 2 }} />
              </View>
            </>
          )}
        </TouchableOpacity>

        {/* ── 2x2 Grid Card ── */}
        <Text style={styles.sectionTitle}>Activities</Text>
        <View style={styles.cardShadow}>
          <View style={styles.gridCard}>
            
            <View style={styles.row}>
              {GRID_ITEMS.slice(0, 2).map((item, idx) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.btn,
                    pressed && { opacity: 0.82 },
                    idx === 0 && styles.btnBorderRight,
                  ]}
                  onPress={() => openModal(item.label)}
                >
                  <Ionicons name={item.icon as any} size={32} color={item.iconColor} />
                  <Text style={[styles.gridLabel, { color: item.iconColor }]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.row}>
              {GRID_ITEMS.slice(2).map((item, idx) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => [
                    styles.btn,
                    pressed && { opacity: 0.82 },
                    styles.btnBorderTop,
                    idx === 0 && styles.btnBorderRight,
                  ]}
                  onPress={() => openModal(item.label)}
                >
                  <Ionicons name={item.icon as any} size={32} color={item.iconColor} />
                  <Text style={[styles.gridLabel, { color: item.iconColor }]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

          </View>
        </View>
      </ScrollView>

      {/* ── Modal List ── */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={closeModal}
          />
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{activeCategory}</Text>
              <TouchableOpacity onPress={closeModal} hitSlop={8} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalList}>
              {activeCategory && MODAL_DATA[activeCategory]?.map((item: any) => (
                <TouchableOpacity key={item.id} style={styles.listItem} activeOpacity={0.7}>
                  {item.img ? (
                    <Image source={{ uri: item.img }} style={styles.listImage} />
                  ) : (
                    <View style={styles.listIconWrap}>
                      <Ionicons name={item.icon as any} size={24} color={Colors.primary} />
                    </View>
                  )}
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
                </TouchableOpacity>
              ))}
            </ScrollView>

          </Animated.View>
        </Animated.View>
      </Modal>
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
  },
  screenTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  
  // Hero
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    ...Shadow.sm,
  },
  heroCardActive: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    ...Shadow.sm,
  },
  heroActiveInner: {
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    marginBottom: Spacing.sm,
  },
  badgeFocus: {
    backgroundColor: Colors.primaryLight,
  },
  badgeBreak: {
    backgroundColor: Colors.successLight,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  heroTimerHuge: {
    fontSize: 64,
    fontWeight: "800",
    letterSpacing: 2,
  },
  heroSubActive: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  heroLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  heroIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  heroSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  heroRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroTimer: {
    fontSize: 22,
    fontWeight: "800",
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    paddingHorizontal: 4,
  },

  // Grid
  cardShadow: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    ...Shadow.sm,
  },
  gridCard: {
    borderRadius: 20,
    overflow: "hidden", 
  },
  row: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  btnBorderRight: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0,0,0,0.07)",
  },
  btnBorderTop: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.07)",
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: "50%",
    maxHeight: "80%",
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  closeBtn: {
    backgroundColor: "#F3F4F6",
    borderRadius: Radius.full,
    padding: 6,
  },
  modalList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listImage: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: "#E5E7EB",
  },
  listIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  listTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  // ── Local Session Card Styles ──
  sessionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    ...Shadow.sm,
    gap: Spacing.sm,
  },
  badgeLocal: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
    marginBottom: 4,
  },
  badgeTextLocal: {
    fontSize: 12,
    fontWeight: "700",
  },
  taskName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 26,
  },
  timerWrap: {
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  timerLocal: {
    fontSize: 60,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: 2,
    textAlign: "center",
  },
  timerInput: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingVertical: 0,
    minWidth: 100,
  },
  timerLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  btnRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: 4,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  btnSecondary: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
});