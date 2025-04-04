import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

export default function JobDetails() {
  const { jobId, job } = useLocalSearchParams();
  const router = useRouter();
  const jobDetails = job ? JSON.parse(job as string) : null;

  const renderSection = (title: string, icon: string, content: any) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon as any} size={24} color="#4D8AF0" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );

  const renderImages = () => {
    if (!jobDetails.creatives || jobDetails.creatives.length === 0) return null;

    return (
      <View style={styles.imagesContainer}>
        {jobDetails.creatives.map((creative: any, index: number) => (
          <Image
            key={index}
            source={{ uri: creative.file }}
            style={styles.jobImage}
            defaultSource={require("../../assets/logo.png")} // Add a placeholder image
          />
        ))}
      </View>
    );
  };

  const renderDetailItem = (label: string, value: any, icon?: string) => (
    <View style={styles.detailItem}>
      {icon && (
        <Feather
          name={icon as any}
          size={16}
          color="#8CA3C7"
          style={styles.itemIcon}
        />
      )}
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value || "Not specified"}</Text>
    </View>
  );

  if (!jobDetails) {
    return (
      <LinearGradient colors={["#0A0F1F", "#0A1A2F"]} style={styles.container}>
        <Text style={styles.errorText}>🚨 Job details not available</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color="#E6F1FF" />
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0A0F1F", "#0A1A2F"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.jobTitle}>{jobDetails.title}</Text>
          <View style={styles.companyBadge}>
            <FontAwesome name="building" size={16} color="#4D8AF0" />
            <Text style={styles.companyText}>{jobDetails.company_name}</Text>
          </View>
        </View>
        {renderImages()}
        {/* Main Content */}
        {renderSection(
          "Job Overview",
          "work",
          <>
            {renderDetailItem("Job Type", jobDetails.type, "briefcase")}
            {renderDetailItem(
              "Experience",
              jobDetails.primary_details?.Experience,
              "award"
            )}
            {renderDetailItem(
              "Qualifications",
              jobDetails.primary_details?.Qualification,
              "book"
            )}
            {renderDetailItem("Shift Timing", jobDetails.shift_timing, "clock")}
          </>
        )}

        {renderSection(
          "Salary & Location",
          "location-on",
          <>
            {renderDetailItem(
              "Salary Range",
              `${jobDetails.salary_min} - ${jobDetails.salary_max}`,
              "dollar-sign"
            )}
            {renderDetailItem("Location", jobDetails.city_location, "map-pin")}
            {renderDetailItem("Locality", jobDetails.locality, "navigation")}
          </>
        )}

        {renderSection(
          "Application Details",
          "description",
          <>
            {renderDetailItem(
              "Openings",
              jobDetails.openings_count,
              "user-plus"
            )}
            {renderDetailItem(
              "Applications",
              jobDetails.num_applications,
              "users"
            )}
            {renderDetailItem("Premium Until", jobDetails.premium_till, "star")}
          </>
        )}

        {/* Tags Section */}
        <View style={styles.tagsContainer}>
          {jobDetails.job_tags?.map((tag: any, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag.value}</Text>
            </View>
          ))}
        </View>

        {/* Additional Details */}
        {renderSection(
          "Additional Info",
          "info",
          <>
            {renderDetailItem("Contact", jobDetails.whatsapp_no, "phone")}
            {renderDetailItem("Custom Link", jobDetails.custom_link, "link")}
            {renderDetailItem("Status", jobDetails.status, "activity")}
          </>
        )}
        {renderSection(
          "Job Description",
          "description",
          <>
            {jobDetails.contentV3?.V3?.map((section: any, index: number) => (
              <View key={index} style={styles.contentSection}>
                <Text style={styles.contentTitle}>{section.field_name}</Text>
                <Text style={styles.contentText}>{section.field_value}</Text>
              </View>
            ))}
            {jobDetails.other_details && (
              <Text style={styles.contentText}>{jobDetails.other_details}</Text>
            )}
          </>
        )}
        {/* Footer Note */}
        <Text style={styles.footerNote}>
          Last updated: {jobDetails.updated_on || "N/A"}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingTop: 48,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButtonText: {
    color: "#E6F1FF",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  jobTitle: {
    color: "#E6F1FF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    lineHeight: 34,
    marginTop: 79,
  },
  companyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(77, 138, 240, 0.15)",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  companyText: {
    color: "#4D8AF0",
    marginLeft: 8,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "rgba(21, 30, 45, 0.6)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(77, 138, 240, 0.1)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(77, 138, 240, 0.1)",
    paddingBottom: 12,
  },
  sectionTitle: {
    color: "#E6F1FF",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  itemIcon: {
    marginRight: 12,
    width: 24,
  },
  detailLabel: {
    color: "#8CA3C7",
    fontSize: 14,
    fontWeight: "500",
    width: 120,
  },
  detailValue: {
    color: "#E6F1FF",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  tag: {
    backgroundColor: "rgba(77, 138, 240, 0.15)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#4D8AF0",
    fontSize: 12,
    fontWeight: "600",
  },
  footerNote: {
    color: "#8CA3C7",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 18,
    textAlign: "center",
    marginTop: 48,
  },
  imagesContainer: {
    marginBottom: 24,
  },
  jobImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: "cover",
  },
  contentSection: {
    marginBottom: 16,
  },
  contentTitle: {
    color: "#4D8AF0",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  contentText: {
    color: "#E6F1FF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
});
