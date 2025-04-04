import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <LinearGradient
        colors={["#0A0F1F", "#0A1A2F"]}
        style={styles.splashContainer}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.splashText}>JobFinder Pro</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0A0F1F", "#0A1A2F"]} style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to JobFinder</Text>
        <Text style={styles.subtitle}>Discover Your Next Opportunity</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/jobs")}
          >
            <LinearGradient
              colors={["#4D8AF0", "#2563EB"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <FontAwesome name="search" size={20} color="white" />
              <Text style={styles.buttonText}>Browse Jobs</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/bookmarks")}
          >
            <LinearGradient
              colors={["#E11D48", "#BE123C"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <FontAwesome name="bookmark" size={20} color="white" />
              <Text style={styles.buttonText}>Saved Jobs</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  logoSmall: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  splashText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#E6F1FF",
    marginTop: 24,
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#E6F1FF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#8CA3C7",
    marginBottom: 48,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
  },
  button: {
    borderRadius: 14,
    marginVertical: 12,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 12,
  },
});