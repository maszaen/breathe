import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/Home/HomeScreen";
import TaskScreen from "../screens/Task/TaskScreen";
import FunBreakScreen from "../screens/FunBreak/FunBreakScreen";
import HealthScreen from "../screens/Health/HealthScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

import { Colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          backgroundColor: Colors.surface,
          position: "absolute",

          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 8),
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap =
            "home-outline";

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;

            case "Task":
              iconName = "list-outline";
              break;

            case "Fun Break":
              iconName = "game-controller-outline";
              break;

            case "Health":
              iconName = "heart-outline";
              break;

            case "Profile":
              iconName = "person-outline";
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Task"
        component={TaskScreen}
      />

      <Tab.Screen
        name="Fun Break"
        component={FunBreakScreen}
      />

      <Tab.Screen
        name="Health"
        component={HealthScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}