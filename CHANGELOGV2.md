# BREATHE v2 — Changelog

> Release date: 2026-07-15

---

## ✨ New Features

### 🤖 AI Assistant Screen
- Brand new **AI Assistant chat screen** accessible from the Home Quick Actions grid
- Realistic **typewriter streaming effect** — AI response rendered character-by-character with randomized chunk sizes (2–4 chars) and variable delay (15–60ms) to mimic real LLM streaming
- **Minimal Markdown renderer** — supports `**bold**` inline formatting inside AI responses
- **Typing indicator** (three animated dots) shown while AI is "thinking"
- **6 contextual dummy response templates** in Bahasa Indonesia covering task prioritization, Pomodoro tips, mental health advice, and productivity guidance
- Keyboard behavior fully fixed for Android (manual `keyboardDidShow` / `keyboardDidHide` listeners to avoid React Native's `KeyboardAvoidingView` miscalculation bug)
- Header design matches existing screen pattern (Pomodoro-style)

---

### 🌬️ Breathing Exercise Screen
- Brand new **Breathing Exercise screen** with animated breathing ring
- **3 selectable breathing patterns**:
  - **Box Breathing** — 4s Inhale → 4s Hold → 4s Exhale → 4s Hold
  - **4-7-8 Relax** — 4s Inhale → 7s Hold → 8s Exhale
  - **Deep Breath** — 5s Inhale → 2s Hold → 5s Exhale
- Animated ring that **expands on Inhale** and **contracts on Exhale** using `Animated.timing` with smooth easing
- Live **phase countdown** displayed in center of ring (large number + phase label)
- **Session stats row** during exercise: Total Time elapsed + Completed Cycles
- Accessible from two entry points:
  - **Health Page** → Breathing Card → "Start Session" button
  - **Fun Break Page** → Relaxation → Breathing Exercise

---

### 🎮 Fun Break — Smart App Launcher
- Replaced static dummy data with a real **app catalog** across 4 categories:
  - **Music**: Spotify, YouTube Music, JOOX, SoundCloud, TIDAL
  - **Games**: Chess.com, Lichess, Wordle, 2048
  - **Videos**: YouTube, Netflix, TikTok, Twitch
  - **Relaxation**: Breathing Exercise (in-app), Stretching Guide, Meditation Timer
- **Smart open logic**: attempts to open native app via deep-link scheme first (`spotify://`, `youtube://`, etc.), automatically falls back to web URL if app is not installed — no empty lists, no false negatives
- Branded icon colors per app instead of generic placeholders

---

### 👤 Profile — Data Management
- **Reset Data** buttons (Low / Medium / High Stress level) to regenerate fresh dynamic demo tasks
- **Clear All Tasks** button to wipe all tasks for a clean slate
- Dynamic task generation uses `new Date()` at call time so deadlines are always relative to today (overdue, today, this week, upcoming)

---

### 🔐 Guest Login
- Added **"Continue as Guest"** button on the Login screen
- Bypasses Firebase authentication entirely — ideal for presentations and demos
- Navigates directly to the Main app experience

---

## 🛠️ Improvements & Fixes

### Pomodoro — Active Task Highlight
- When entering Pomodoro from a specific task's **Focus** button, a prominent card now shows the task name and course/subject
- Generic Pomodoro (opened without a task) shows **"General Focus Session"** label instead
- **Fun Break page** also reflects the active task in the Pomodoro hero card when a focus session is running

### Status Bar
- Fixed **status bar icons** globally — changed to `dark-content` so the clock, battery, and signal icons are dark/visible against the app's white and light-gray backgrounds
- Applied globally via `App.tsx` with `backgroundColor="transparent"` and `translucent` for edge-to-edge correctness

### AI Assistant — Header Redesign
- Aligned header style to match existing screens (Pomodoro pattern: large bold title, subtitle, circular back button with shadow)
- Removed experimental "Online" indicator and avatar in header

### Fun Break — BreathingCard Navigation
- "Start Session" button on the **Health page Breathing card** was previously a no-op placeholder — now correctly navigates to the new Breathing Exercise screen

### General Code Quality
- Removed unused `Image` import from `FunBreakScreen`
- Removed dead `listImage` style
- Cleaned up detection state (`detecting`, `detectedApps`) in favor of simpler show-all logic
- Removed leftover `emptyState` styles that were no longer reachable

---

## 📁 Files Changed

| File | Change |
|---|---|
| `src/screens/AIAssistant/AIAssistantScreen.tsx` | **NEW** — Full AI chat screen |
| `src/screens/Breathing/BreathingScreen.tsx` | **NEW** — Breathing exercise screen |
| `src/screens/FunBreak/FunBreakScreen.tsx` | App catalog, smart-open, Breathing nav |
| `src/screens/Health/HealthScreen.tsx` | Pass navigation to BreathingCard |
| `src/screens/Login/LoginScreen.tsx` | Guest login button |
| `src/screens/Pomodoro/PomodoroScreen.tsx` | Active task highlight card |
| `src/screens/Profile/ProfileScreen.tsx` | Data management section |
| `src/components/health/BreathingCard.tsx` | Accept `onPress` prop, wire button |
| `src/components/home/QuickActionsCard.tsx` | AI Chat button navigates to AIAssistant |
| `src/context/TaskContext.tsx` | `resetTasks` and `clearTasks` functions |
| `src/utils/dummyTasks.ts` | Dynamic date-relative task generation |
| `src/navigation/AppNavigator.tsx` | Register AIAssistant and Breathing screens |
| `src/types/navigation.ts` | Add AIAssistant and Breathing to param list |
| `App.tsx` | Global StatusBar `dark-content` |

---

## 📦 No New Dependencies

All changes use packages already present in the project:
- `react-native` core (`Animated`, `Keyboard`, `Linking`, `StatusBar`)
- `@expo/vector-icons` (Ionicons)
- `react-native-safe-area-context`
- `@react-navigation/native-stack`
