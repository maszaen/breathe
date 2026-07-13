import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";

import AddTaskScreen from "../screens/AddTask/AddTaskScreen";
import EditTaskScreen from "../screens/EditTask/EditTaskScreen";
import PomodoroScreen from "../screens/Pomodoro/PomodoroScreen";

import BottomTabNavigator from "./BottomTabNavigator";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
        />

        <Stack.Screen
          name="EditTask"
          component={EditTaskScreen}
        />

        <Stack.Screen
          name="Pomodoro"
          component={PomodoroScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}