import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/Home/HomeScreen";
import TaskScreen from "../screens/Task/TaskScreen";
import FunBreakScreen from "../screens/FunBreak/FunBreakScreen";
import HealthScreen from "../screens/Health/HealthScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

import { Colors } from "../theme/colors";
import { BottomTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#B0B8C1",

        tabBarStyle: {
          backgroundColor: Colors.surface,
          position: "absolute",
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 10),
          borderTopWidth: 1,
          borderTopColor: Colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Task":
              iconName = focused ? "list" : "list-outline";
              break;
            case "Fun Break":
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
              break;
            case "Health":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={TaskScreen} />
      <Tab.Screen name="Fun Break" component={FunBreakScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}