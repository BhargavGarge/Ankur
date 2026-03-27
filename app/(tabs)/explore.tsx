import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={26} color="#1B4F72" />


        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Your Indian community in Germany
          </Text>
        </View>

        {/* Community Forum */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Forums</Text>

          <View style={styles.card}>
            <Text style={styles.tag}>HOT TOPIC</Text>
            <Text style={styles.cardTitle}>
              Best place for Indian groceries in Mitte?
            </Text>

            <View style={styles.row}>
              <Text style={styles.meta}>24 replies</Text>
              <Text style={styles.meta}>142 upvotes</Text>
            </View>
          </View>
        </View>

        {/* Language Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language Learning</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.moduleCard}>
              <Text style={styles.moduleTag}>Module 04</Text>
              <Text style={styles.moduleTitle}>At the Bürgeramt</Text>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Practice with AI</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.moduleCard}>
              <Text style={styles.moduleTag}>Module 09</Text>
              <Text style={styles.moduleTitle}>Health Insurance Call</Text>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Practice with AI</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Housing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Housing Leads</Text>

          <View style={styles.listItem}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
              }}
              style={styles.listImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>
                Room available in Charlottenburg
              </Text>
              <Text style={styles.price}>€650/mo</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} />
          </View>

          <View style={styles.listItem}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
              }}
              style={styles.listImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>
                1-Zimmer Apartment in Wedding
              </Text>
              <Text style={styles.price}>€820/mo</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} />
          </View>
        </View>

        {/* Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Event</Text>

          <View style={styles.eventCard}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1608889175113-1b99b9c0e9b6"
              }}
              style={styles.eventImage}
            />

            <View style={styles.eventOverlay}>
              <Text style={styles.eventTitle}>Diwali Night Berlin</Text>
              <Text style={styles.eventDate}>Nov 12 • 6:00 PM</Text>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.buttonText}>Join Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 20,

  },

  logo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B4F72"
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18
  },

  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 20
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1B4F72"
  },

  subtitle: {
    color: "#666",
    marginTop: 4
  },

  section: {
    paddingHorizontal: 16,
    marginBottom: 28
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3
  },

  tag: {
    color: "#1B4F72",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 6
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12
  },

  row: {
    flexDirection: "row",
    gap: 16
  },

  meta: {
    color: "#777",
    fontSize: 12
  },

  moduleCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: "space-between"
  },

  moduleTag: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4
  },

  moduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12
  },

  primaryButton: {
    backgroundColor: "#1B4F72",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600"
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10
  },

  listImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 12
  },

  listTitle: {
    fontWeight: "600",
    fontSize: 14
  },

  price: {
    color: "#1B4F72",
    marginTop: 4,
    fontWeight: "600"
  },

  eventCard: {
    borderRadius: 18,
    overflow: "hidden"
  },

  eventImage: {
    width: "100%",
    height: 180
  },

  eventOverlay: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)"
  },

  eventTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700"
  },

  eventDate: {
    color: "#ddd",
    marginBottom: 10
  },

  navbar: {
    height: 70,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});