# BREATHE Agent Instructions

## Project Identity

BREATHE is an Expo React Native app for student productivity and mental-health awareness. The current app is a lightweight mobile client with authentication mock screens, task management, deadline grouping, a mental-health score, and placeholder areas for profile and fun-break features.

This project uses Expo SDK 56. Before writing or changing code, read the exact versioned Expo docs for this project:

https://docs.expo.dev/versions/v56.0.0/

Use the SDK 56 assumptions from the docs and this repo, not older Expo habits.

## Runtime And Requirements

- Expo: `~56.0.12`
- React Native: `0.85.3`
- React: `19.2.3`
- TypeScript: `~6.0.3`
- Node: follow Expo SDK 56 requirements. SDK 56 expects modern Node 22.13.x or newer.
- Entry point: `index.ts`
- Root component: `App.tsx`
- Config: `app.json`
- TypeScript config: strict mode via `expo/tsconfig.base`

Run commands from the repository root:

```sh
npm start
npm run android
npm run ios
npm run web
```

There is no dedicated lint, test, or format script currently. When changing code, at minimum run TypeScript validation with:

```sh
npx tsc --noEmit
```

## Architecture

- `App.tsx` wraps the app with `SafeAreaProvider` and `TaskProvider`, then renders `AppNavigator`.
- `src/navigation/AppNavigator.tsx` defines the native stack: `Splash`, `Login`, `Register`, `Main`, `AddTask`, and `EditTask`.
- `src/navigation/BottomTabNavigator.tsx` defines the bottom tabs: `Home`, `Task`, `Fun Break`, `Health`, and `Profile`.
- `src/context/TaskContext.tsx` owns in-memory task state and exposes `addTask`, `deleteTask`, `toggleTask`, and `updateTask`.
- `src/screens/*` contains full-screen views.
- `src/components/*` contains reusable UI grouped by feature or role.
- `src/theme/*` contains shared design tokens.
- `src/utils/*` contains date grouping, deadline status, sorting, and mental-health calculations.
- `src/assets/images/breathe-logo.png` is the in-app logo. Root `assets/*` are Expo app icons/splash assets.

Do not introduce Expo Router unless the task explicitly asks for a navigation migration. This app currently uses React Navigation manually.

## Current Product Behavior

- Tasks are stored only in React state. They are lost when the app restarts.
- Dates are stored as `DD/MM/YYYY`; times are stored as `HH:mm`.
- Deadline sorting and grouping depend on that date/time string format.
- Task sections are grouped into overdue, today, tomorrow, this week, and upcoming.
- Mental-health scoring is heuristic and based on incomplete tasks and deadline proximity.
- Login, register, profile, fun-break, social auth, AI assistant, pomodoro, videos, and music are placeholders or mock flows.

When adding persistence, backend calls, auth, notifications, or AI features, treat it as a real feature addition and update the affected architecture intentionally.

## Coding Style

- Use TypeScript and React function components.
- Keep component props typed with local `type Props = { ... }` aliases.
- Prefer explicit project types, especially `Task` from `src/context/TaskContext.tsx`, over `any`.
- Existing navigation props often use `any`; improve them when touching related code, but avoid broad unrelated rewrites.
- Keep imports grouped in this order:
  1. React and React Native imports
  2. Expo, React Navigation, and third-party imports
  3. Local components, context, utils, and theme imports
- Use `StyleSheet.create` at the bottom of component files.
- Prefer shared tokens from `src/theme/colors.ts`, `src/theme/spacing.ts`, `src/theme/radius.ts`, and `src/theme/typography.ts`.
- Keep UI text in English unless the surrounding feature intentionally changes language.
- Avoid broad refactors while implementing a focused feature.
- Preserve strict TypeScript compatibility.

The existing formatting is mostly two-space indentation in screens/components, with a few four-space files in utilities and some components. New or heavily edited files should use two-space indentation for consistency going forward.

## UI And Design Rules

- Keep the app calm, clean, mobile-first, and productivity-focused.
- Reuse the existing BREATHE palette: cyan primary, white cards, light gray backgrounds, semantic success/warning/danger colors.
- Use `SafeAreaView` or safe-area insets for screens that touch device edges.
- Use `ScrollView`, `FlatList`, or `SectionList` appropriately for content that can grow.
- Maintain enough bottom padding on tab screens so content and floating buttons do not sit under the bottom tab bar.
- Use `Ionicons` from `@expo/vector-icons` for UI icons.
- Avoid raw emoji in UI. Some current emoji strings appear corrupted due to encoding, so prefer icon components or image assets when adding or repairing icon-like UI.
- Keep cards simple: `Colors.surface`, `Radius.lg`, light shadows, and readable spacing.
- Keep touch targets comfortable, roughly 44px or larger.
- Do not add decorative gradients, marketing hero sections, or web-style landing-page layouts inside the native app.

## Data And Date Handling

- Be careful with `deadline` and `deadlineTime`; utilities assume `DD/MM/YYYY` and `HH:mm`.
- If changing the date model, update all dependent code together:
  - `AddTaskScreen`
  - `EditTaskScreen`
  - `TaskContext`
  - `deadline.ts`
  - `taskGrouping.ts`
  - `mentalHealth.ts`
  - task cards and deadline displays
- Avoid duplicating date parsing/formatting logic. Prefer shared utilities.
- Deadline logic is time-sensitive; test overdue, today, tomorrow, this-week, and future cases.

## State Management

- Keep simple app-wide task state in `TaskContext` unless a feature clearly needs persistence or a more formal store.
- Do not mutate task arrays or task objects directly. Use immutable updates.
- Preserve the `Task` shape unless changing all usages intentionally.
- `id` and `createdAt` are currently generated with `Date.now()`. If uniqueness matters more later, replace this deliberately across the task flow.

## Dependency Guidance

- Use Expo-compatible packages and versions that match SDK 56.
- Check the Expo SDK 56 docs before adding native modules or config plugins.
- Prefer packages already present in `package.json` when they solve the need:
  - React Navigation for navigation
  - `@expo/vector-icons` for icons
  - `react-native-safe-area-context` for safe areas
  - `@react-native-community/datetimepicker` for date/time input
- If adding a dependency, update `package.json` and `package-lock.json` together.

## Quality Checklist

Before finishing a change:

- Confirm the app still follows Expo SDK 56 docs and package expectations.
- Run `npx tsc --noEmit` when code changed.
- For UI changes, manually inspect the affected screen on a small mobile viewport or device when possible.
- Check that task creation, editing, toggling, deleting, and deadline grouping still work when touched.
- Check empty states for lists and cards.
- Check safe-area and tab-bar spacing on screens with scrollable content.
- Avoid leaving placeholder callbacks like `onPress={() => {}}` in newly implemented features.
- Do not silently add persistence, networking, notifications, or auth side effects unless requested.

## Known Cleanup Opportunities

These are known issues, not automatic tasks:

- Replace `any` navigation props with typed React Navigation params.
- Replace remaining raw/corrupted emoji UI with `Ionicons` or assets.
- Consolidate duplicated date formatting in add/edit task screens.
- Add persistence if tasks should survive app restarts.
- Add tests for deadline parsing, grouping, sorting, and mental-health scoring.
- Flesh out placeholder screens and actions: profile, fun break, pomodoro, AI assistant, music, videos, and auth flows.
