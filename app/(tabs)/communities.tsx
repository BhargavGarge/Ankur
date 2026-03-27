import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CommunityScreen() {
    const cities = ["Berlin", "Munich", "Stuttgart", "Hamburg", "Frankfurt"];

    const discussions = [
        {
            user: "u/Arjun_K",
            title: "Best place for Indian groceries in Mitte?",
            replies: 24,
            votes: 88,
            time: "4h ago"
        },
        {
            user: "u/Sara_Berlin",
            title: "WG-Gesucht tips for newcomers?",
            replies: 15,
            votes: 45,
            time: "6h ago"
        },
        {
            user: "u/Marc_Expert",
            title:
                "Anmeldung appointment at Bürgeramt Charlottenburg — anyone got luck?",
            replies: 32,
            votes: 110,
            time: "12h ago"
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={24} color="#1B4F72" />
                    <Text style={styles.title}>Ankur Communities</Text>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#777" />
                    <TextInput
                        placeholder="Search discussions..."
                        style={styles.searchInput}
                    />
                </View>

                {/* Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cities.map((city, i) => (
                        <TouchableOpacity
                            key={city}
                            style={[
                                styles.tab,
                                i === 0 && styles.activeTab
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    i === 0 && styles.activeTabText
                                ]}
                            >
                                {city}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Discussions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Discussions</Text>

                    {discussions.map((item, i) => (
                        <View key={i} style={styles.card}>

                            {/* Votes */}
                            <View style={styles.vote}>
                                <MaterialIcons name="keyboard-arrow-up" size={22} />
                                <Text style={styles.voteCount}>{item.votes}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={22} />
                            </View>

                            {/* Content */}
                            <View style={styles.cardContent}>
                                <Text style={styles.user}>
                                    {item.user} • {item.time}
                                </Text>

                                <Text style={styles.cardTitle}>
                                    {item.title}
                                </Text>

                                <View style={styles.actions}>
                                    <Text style={styles.action}>
                                        💬 {item.replies}
                                    </Text>
                                    <Text style={styles.action}>🔗 Share</Text>
                                    <Text style={styles.action}>🔖 Save</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Button */}
            <TouchableOpacity style={styles.fab}>
                <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>

            {/* Bottom Navigation */}

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9FB"
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 12,
        marginTop: 20

    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1B4F72"
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 15
    },

    searchInput: {
        flex: 1,
        padding: 10
    },

    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8
    },

    tabText: {
        color: "#777"
    },

    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#1B4F72"
    },

    activeTabText: {
        color: "#1B4F72",
        fontWeight: "600"
    },

    section: {
        padding: 16
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        color: "#1B4F72"
    },

    card: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 14,
        borderRadius: 12,
        marginBottom: 12
    },

    vote: {
        alignItems: "center",
        marginRight: 10
    },

    voteCount: {
        fontWeight: "700"
    },

    cardContent: {
        flex: 1
    },

    user: {
        fontSize: 12,
        color: "#777",
        marginBottom: 5
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8
    },

    actions: {
        flexDirection: "row",
        gap: 15
    },

    action: {
        fontSize: 12,
        color: "#777"
    },

    fab: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "#1B4F72",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center"
    },

    nav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#eee"
    },

    navItem: {
        alignItems: "center"
    },

    navText: {
        fontSize: 10,
        marginTop: 4,
        color: "#888"
    }
});