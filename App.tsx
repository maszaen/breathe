import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/context/TaskContext";
import { PomodoroProvider } from "./src/context/PomodoroContext";

import { AuthProvider } from "./src/context/AuthContext";

import { SettingsProvider } from "./src/context/SettingsContext";

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          <TaskProvider>
            <PomodoroProvider>
              <AppNavigator />
            </PomodoroProvider>
          </TaskProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}