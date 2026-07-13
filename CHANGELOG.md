# Changelog

All notable changes to the **BREATHE** project between the initial commit and the current release.

## [Unreleased]

### 🚀 Added (New Features & Development)
- **Local Storage Persistence**: Integrated `AsyncStorage` into `TaskContext` so that user tasks are now saved persistently across app restarts.
- **Fun Break Screen**: Developed a fully functional Fun Break screen featuring a local break timer, interactive category modals (Games, Music, Videos), and direct shortcuts to Pomodoro sessions.
- **Profile Screen**: Implemented a comprehensive user profile screen to manage settings and track user statistics.
- **Hero & Quick Action Cards**: Added new modular components (`HeroCard`, `QuickActionsCard`) on the Home screen to centralize important tasks and shortcuts.
- **EAS Configuration**: Added `eas.json` to support Expo Application Services builds for Android (`apk`) and iOS.
- **Dummy Data Utilities**: Created `dummyTasks.ts` to help with development and UI testing.

---

### 💅 Redesigned (UI/UX Improvements)
- **Gestalt Principles (Flat UI Paradigm)**: Completely overhauled the UI architecture to utilize edge-to-edge layouts, eliminating unnecessary heavy "floating cards" and shadows that cluttered small mobile screens.
- **Task Screen Refactor**: 
  - Integrated `react-native-reanimated` (`LinearTransition`, `FadeInDown`) for buttery-smooth accordion toggling and list item animations, replacing the buggy and experimental `LayoutAnimation`.
  - Task cards are now flat list items with clean bottom borders, maximizing screen real estate.
- **Home Screen Overhaul**: 
  - Redesigned `WelcomeCard` to feature dynamic time-based greetings (Morning, Afternoon, Evening) with localized dates and icons.
  - Consolidated scattered features into grouped components for better cognitive proximity.
- **Health Screen Enhancements**: Flattened section wrappers to make the Mental Health Meter, Analysis, and Recommendations flow naturally down the page. Connected these components to dynamic health color logic.
- **Pomodoro Screen Redesign**: Refactored the Pomodoro timer UI to match the new premium design language.
- **Modern Theme Palette**: Updated `colors.ts` with a premium, softer color palette (Cyan/Blue primary) and refined shadow constraints (`Shadow.sm`, `Shadow.md`).

---

### 🐛 Fixed (Bug Fixes & Optimizations)
- **SafeAreaView Deprecation**: Migrated `SafeAreaView` imports from `react-native` to `react-native-safe-area-context` to prevent runtime warnings.
- **DateTimePicker Warnings**: Updated deprecated `onChange` event handlers to `onValueChange` and `onDismiss` in Task forms.
- **SectionList Null Render Bug**: Fixed an issue in `TaskScreen` where collapsed sections rendered null items, replacing it with a robust filtering strategy before rendering.
- **Layout Animation Warning**: Removed the experimental `UIManager.setLayoutAnimationEnabledExperimental(true)` which caused warnings in React Native's New Architecture.
