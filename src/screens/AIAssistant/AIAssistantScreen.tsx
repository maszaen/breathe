import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Shadow } from "../../theme/colors";
import { Radius } from "../../theme/radius";
import { Spacing } from "../../theme/spacing";
import { RootStackScreenProps } from "../../types/navigation";

// Minimal Markdown text component for bold parsing (e.g. **text**)
const MinimalMarkdown = ({ text, isUser }: { text: string; isUser: boolean }) => {
  const textColor = isUser ? "#fff" : Colors.text;
  
  // Split text by newlines first
  const lines = text.split('\n');
  
  return (
    <View style={{ flexDirection: 'column' }}>
      {lines.map((line, lineIndex) => {
        // Split each line by bold syntax **...**
        const parts = line.split(/(\*\*.*?\*\*)/g);
        
        return (
          <Text key={lineIndex} style={[styles.messageText, { color: textColor }]}>
            {parts.map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <Text key={index} style={{ fontWeight: 'bold' }}>
                    {part.slice(2, -2)}
                  </Text>
                );
              }
              return <Text key={index}>{part}</Text>;
            })}
          </Text>
        );
      })}
    </View>
  );
};

const AI_TEMPLATES = [
  "Halo! Berdasarkan datamu, sepertinya beban tugasmu lumayan menumpuk. Coba prioritaskan tugas yang deadlinenya paling dekat. Mau aku bantu set timer **Pomodoro**?",
  "Hai! Jangan lupa ambil nafas sebentar. Dari analisa sistem, kamu butuh istirahat. Coba fitur **Fun Break** lalu kembali kerjakan tugas utamamu ya!",
  "Untuk urusan ini, saran terbaikku adalah menggunakan teknik **Pomodoro**. Fokus 25 menit, lalu istirahat 5 menit. Semangat, kamu pasti bisa menyelesaikannya!",
  "Wah, kelihatannya kamu sedang produktif! Pertahankan ritme ini. Ingat, mengerjakan satu tugas pada satu waktu jauh lebih efektif daripada **multitasking**.",
  "Menurut perhitungan metrik **Mental Health**-mu saat ini, kamu perlu sedikit cooling down. Coba dengarkan lagu lo-fi atau main game ringan di Fun Break sebelum lanjut nugas.",
  "Menarik! Kalau boleh saran, pecah tugas besarmu jadi bagian-bagian kecil agar lebih mudah dieksekusi. Jangan memaksakan diri kalau sudah lelah ya."
];

export default function AIAssistantScreen({ navigation }: RootStackScreenProps<"AIAssistant">) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardPadding, setKeyboardPadding] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am your **BREATHE AI Assistant**. I can help you prioritize your tasks, give study tips, or just listen if you're stressed.\n\nWhat's on your mind?",
    },
  ]);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Scroll to bottom on new messages or keyboard show
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      if (Platform.OS === "android") {
        setKeyboardPadding(e.endCoordinates.height + 12);
      }
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      if (Platform.OS === "android") {
        // Force 0 when closed to fix the Android 30-40px miscalculation bug
        setKeyboardPadding(0);
      }
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const simulateAITyping = (messageId: string, fullText: string) => {
    let currentIndex = 0;
    
    const typeNextChunk = () => {
      if (currentIndex >= fullText.length) {
        setIsTyping(false);
        return;
      }

      // Random chunk size between 2 and 4 characters to simulate tokens
      const chunkSize = Math.floor(Math.random() * 3) + 2; 
      // Random delay between 15ms and 60ms to simulate typing speed variation
      const delay = Math.floor(Math.random() * 45) + 15;

      currentIndex += chunkSize;
      const currentText = fullText.slice(0, currentIndex);

      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === messageId ? { ...msg, text: currentText } : msg
        )
      );

      // Scroll to bottom occasionally while typing
      if (Math.random() > 0.8) {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }

      setTimeout(typeNextChunk, delay);
    };

    setTimeout(typeNextChunk, 300); // Initial delay before typing starts
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    
    // Add user message
    const userMsg = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    
    // Scroll immediately
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

    setIsTyping(true);

    // Initial placeholder AI message
    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: aiMessageId, sender: "ai", text: "..." }
    ]);

    // Pick random template
    const responseTemplate = AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)];

    // Simulate typing
    setTimeout(() => {
      simulateAITyping(aiMessageId, responseTemplate);
    }, 600); // Thinking delay
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header — sama seperti Pomodoro Screen */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <Text style={styles.headerSub}>Tanyakan apa saja.</Text>
        </View>
      </View>

      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior="padding"
        >
          {/* Chat Area */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatArea}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.sender === "user" ? styles.messageRowUser : styles.messageRowAI,
                ]}
              >
                {msg.sender === "ai" && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles" size={11} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    msg.sender === "user" ? styles.messageUser : styles.messageAI,
                  ]}
                >
                  {msg.text === "..." ? (
                    <View style={styles.typingIndicator}>
                       <View style={styles.typingDot} />
                       <View style={[styles.typingDot, { opacity: 0.5 }]} />
                       <View style={[styles.typingDot, { opacity: 0.25 }]} />
                    </View>
                  ) : (
                    <MinimalMarkdown text={msg.text} isUser={msg.sender === "user"} />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Area */}
          <View style={[styles.inputWrap, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tanyakan sesuatu..."
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={200}
                editable={!isTyping}
              />
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  (!input.trim() || isTyping) && { backgroundColor: Colors.border },
                ]}
                onPress={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Ionicons name="send" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={{ flex: 1, paddingBottom: keyboardPadding }}>
          {/* Chat Area */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatArea}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.sender === "user" ? styles.messageRowUser : styles.messageRowAI,
                ]}
              >
                {msg.sender === "ai" && (
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles" size={11} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    msg.sender === "user" ? styles.messageUser : styles.messageAI,
                  ]}
                >
                  {msg.text === "..." ? (
                    <View style={styles.typingIndicator}>
                       <View style={styles.typingDot} />
                       <View style={[styles.typingDot, { opacity: 0.5 }]} />
                       <View style={[styles.typingDot, { opacity: 0.25 }]} />
                    </View>
                  ) : (
                    <MinimalMarkdown text={msg.text} isUser={msg.sender === "user"} />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input Area */}
          <View style={[styles.inputWrap, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tanyakan sesuatu..."
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={200}
                editable={!isTyping}
              />
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  (!input.trim() || isTyping) && { backgroundColor: Colors.border },
                ]}
                onPress={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Ionicons name="send" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },

  // ── Header ──────────────────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...Shadow.sm,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },

  // ── Chat Area ────────────────────────────────────────
  chatArea: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: 10,
  },

  // ── Bubbles ──────────────────────────────────────────
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageRowAI: {
    justifyContent: "flex-start",
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    flexShrink: 0,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageAI: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  messageUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },

  // ── Typing dots ──────────────────────────────────────
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    height: 21,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textTertiary,
  },

  // ── Input bar ────────────────────────────────────────
  inputWrap: {
    paddingHorizontal: Spacing.md,
    paddingTop: 10,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F0F4F8",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingLeft: Spacing.md,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 6,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 110,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.border,
  },
});

