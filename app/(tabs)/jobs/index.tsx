import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const JOBS_API = "https://testapi.getlokalapp.com/common/jobs?page=";

export default function JobsScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarks, setBookmarks] = useState<any[]>([]); // Track bookmarked jobs

  // Load bookmarks on mount
  useFocusEffect(
    useCallback(() => {
      const loadBookmarks = async () => {
        try {
          const stored = await AsyncStorage.getItem("bookmarks");
          if (stored) setBookmarks(JSON.parse(stored));
        } catch (error) {
          console.error("Error loading bookmarks", error);
        }
      };
      loadBookmarks();
    }, [])
  );

  const fetchJobs = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      if (reset) {
        const response = await axios.get(JOBS_API + 1);
        const newJobs = response.data.results;
        const filteredJobs = newJobs.filter((job: any) => job.id !== undefined);
        setJobs(filteredJobs);
        setPage(2);
      } else {
        if (page <= 3) {
          const response = await axios.get(JOBS_API + page);
          const newJobs = response.data.results;
          const filteredJobs = newJobs.filter(
            (job: any) => job.id !== undefined
          );
          setJobs(filteredJobs);
          setJobs((prev) => [...prev, ...filteredJobs]);
          setPage((prev) => prev + 1);
        } else {
          setJobs((prev) => [...prev, ...prev]);
          setPage((prev) => prev + 1);
        }
      }
    } catch (err) {
      setError("Failed to load jobs");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const bookmarkJob = async (job: any) => {
    try {
      const stored = await AsyncStorage.getItem("bookmarks");
      let updatedBookmarks = stored ? JSON.parse(stored) : [];

      if (!updatedBookmarks.some((b: any) => b.id === job.id)) {
        updatedBookmarks = [...updatedBookmarks, job];
        alert("Job bookmarked!");
      } else {
        alert("Already bookmarked");
        return;
      }

      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isBookmarked = bookmarks.some((b) => b.id === item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/jobs/[jobId]",
            params: {
              jobId: item.id?.toString() || index.toString(),
              job: JSON.stringify(item),
            },
          })
        }
      >
        <View style={styles.accentBorder} />
        <Text style={styles.title}>{item?.title || "Job title missing"}</Text>

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
          {item.custom_link && (
            <Text style={styles.linkText}>
              📱 Contact: {item.custom_link || "Use Portal"}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => bookmarkJob(item)}
        >
          <Text style={styles.bookmarkText}>
            ⭐ {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) =>
          item?.id ? `${item.id}-${index}` : `fallback-${index}`
        }
        renderItem={renderItem}
        onEndReached={() => fetchJobs()}
        onEndReachedThreshold={0.5}
        onRefresh={() => {
          setRefreshing(true);
          fetchJobs(true);
        }}
        refreshing={refreshing}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#4D8AF0" /> : null
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Styles remain unchanged

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1F",
    paddingTop: 6,
  },
  listContent: {
    padding: 16,
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
  title: {
    color: "#E6F1FF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 0.5,
    textShadowColor: "rgba(77, 138, 240, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
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
  linkText: {
    color: "#4D8AF0",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "600",
  },
  bookmarkButton: {
    backgroundColor: "rgba(77, 138, 240, 0.15)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(77, 138, 240, 0.3)",
  },
  bookmarkText: {
    color: "#4D8AF0",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  error: {
    color: "#FF6B6B",
    textAlign: "center",
    padding: 16,
    fontSize: 16,
    fontWeight: "500",
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
});
