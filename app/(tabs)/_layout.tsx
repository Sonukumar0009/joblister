import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { ViewStyle, TextStyle } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Main tab bar styling
        tabBarActiveTintColor: "#4D8AF0",
        tabBarInactiveTintColor: "#8CA3C7",
        tabBarStyle: {
          backgroundColor: "#0A0F1F",
          borderTopWidth: 1,
          borderTopColor: "rgba(77, 138, 240, 0.15)",
          height: 70,
          paddingHorizontal: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          fontFamily: "Inter-SemiBold",
          paddingBottom: 6,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 2,
          marginVertical: 4,
          height: 48,
        },

        // Header styling
        headerBackground: () => (
          <LinearGradient
            colors={["#0A0F1F", "#0A1A2F"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTitleStyle: {
          color: "#E6F1FF",
          fontSize: 22,
          fontWeight: "700",
          fontFamily: "Inter-Bold",
          letterSpacing: 0.5,
        },
        headerTitleAlign: "left",
      }}
    >
      <Tabs.Screen
        name="jobs/index"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome
                name="briefcase"
                size={22}
                color={color}
                style={styles.tabIcon}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks/index"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <FontAwesome
                name="bookmark"
                size={22}
                color={color}
                style={styles.tabIcon}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles: { 
  tabIconContainer: ViewStyle;
  tabIcon: TextStyle;
} = {
  tabIconContainer: {
    position: 'relative',
    height: 60, // Increase the container height
    paddingVertical: 5, // Use vertical padding for spacing
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
  },
  tabIcon: {
    textShadowColor: 'rgba(77, 138, 240, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
};