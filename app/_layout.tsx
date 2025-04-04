import React,{useEffect} from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router/stack";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#0A0F1F");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="#0A0F1F" style="dark" />
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={["#0A0F1F", "#0A0F1F"]}
          style={styles.gradient}
        >
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="jobs/[jobId]"
              options={({ navigation }) => ({
                title: "Opportunity Details",
                headerTintColor: "#FFFFFF",
                headerTransparent: true,
                headerBackground: () => (
                  <LinearGradient
                    colors={["#0A0F1F", "#0A0F1F"]}
                    style={StyleSheet.absoluteFill}
                  />
                ),
                headerTitleStyle: {
                  color: "#FFFFFF",
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Feather name="chevron-left" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                ),
                headerLeftContainerStyle: styles.headerLeftContainer,
              })}
            />
          </Stack>
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerLeftContainer: {
    marginLeft: 16,
    marginTop: 0,
  },
  backButton: {
    padding: 4,
    borderRadius: 50,
    backgroundColor: "#0A0F1F",
    borderWidth: 0.2,
    borderColor: "#FFFFFF",
    marginLeft: 4,
    marginRight: 5,
  },
});
