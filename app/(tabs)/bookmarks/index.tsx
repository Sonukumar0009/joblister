import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState([]);
  const router = useRouter();

  const deleteBookmark = async (jobId: string) => {
    try {
      const updatedBookmarks = bookmarks.filter(
        (item: any) => item.id !== jobId
      );
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error deleting bookmark", error);
    }
  };

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem("bookmarks");
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading bookmarks", error);
    }
  };

  // Fixed useFocusEffect implementation
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/jobs/[jobId]",
          params: { jobId: item.id, job: JSON.stringify(item) },
        })
      }
    >
      {/* Design Elements */}
      <View style={styles.glareOverlay} />
      <View style={styles.accentBorder} />

      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => deleteBookmark(item.id)}
          style={styles.deleteButton}
        >
          <AntDesign name="delete" size={20} color="#FF4D4D" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          🌍 {item.primary_details?.Place || "Remote"}
        </Text>
        <Text style={styles.detailText}>
          💸{" "}
          {item.primary_details?.Salary &&
          item.primary_details.Salary.trim() !== "-"
            ? item.primary_details.Salary
            : "Competitive Salary"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AntDesign name="staro" size={48} color="#4D8AF0" />
          <Text style={styles.noBookmarksText}>No Saved Opportunities</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item: any, index) =>
            item?.id ? item?.id.toString() : `fallback-${index}`
          }
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1F",
    paddingTop: 6,
  },
  card: {
    backgroundColor: "#151E2D",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(77, 138, 240, 0.2)",
    shadowColor: "#4D8AF0",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#E6F1FF",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    marginRight: 12,
    letterSpacing: 0.5,
  },
  detailsContainer: {
    marginVertical: 8,
  },
  detailText: {
    color: "#8CA3C7",
    fontSize: 14,
    marginVertical: 6,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  noBookmarksText: {
    color: "#E6F1FF",
    fontSize: 18,
    marginTop: 16,
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
  },
  accentBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#4D8AF0",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  glareOverlay: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transform: [{ rotate: "45deg" }],
    borderRadius: 20,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 77, 77, 0.15)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
