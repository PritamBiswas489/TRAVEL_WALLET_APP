import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const StartPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image
            source={require("@/assets/images/sc-1-bg.png")}
            style={styles.image}
          />

          <View style={styles.subtitleWrap}>
            <Text style={styles.subtitle}>The Problem & The Solution</Text>
          </View>

          <Text style={styles.title}>תשלמו כמו מקומיים בתאילנד</Text>
          <Text style={styles.description}>
            תדלגו על חנויות המרת מטבע ועמלות משיכת כסף. תשלמו בכל מקום בתאילנד
            רק עם הטלפון
          </Text>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        {/* onPress={() => navigation.replace("Home")} */}
        <TouchableOpacity>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        {/* onPress={() => navigation.navigate("Onboarding2")} */}
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/next-btn.png")}
            style={styles.next}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingBottom: 100, // to avoid overlap with navigation
  },
  image: {
    width: "100%",
    height: 600,
    resizeMode: "contain",
    borderRadius: 20,
  },
  subtitleWrap: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  subtitle: {
    color: "#29BDFC",
    backgroundColor: "#e5f7fe",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
  },
  description: {
    textAlign: "right",
    color: "#666",
    fontSize: 16,
    marginBottom: 40,
  },
  navigation: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skip: {
    color: "#3A82F6",
    fontSize: 16,
  },
  next: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#3A82F6",
  },
});

export default StartPage;
