import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import { TaskProvider } from "./src/context/TaskContext";
import { PomodoroProvider } from "./src/context/PomodoroContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <PomodoroProvider>
          <AppNavigator />
        </PomodoroProvider>
      </TaskProvider>
    </SafeAreaProvider>
  );
}