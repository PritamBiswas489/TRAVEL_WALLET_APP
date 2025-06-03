// import { View, Text, Button } from "react-native";
// import { useRouter } from "expo-router";

// export default function StartPage3() {
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Start Page 3</Text>
//       <Button
//         title="Continue to App"
//         onPress={() => router.replace("/login")}
//       />
//     </View>
//   );
// }

import { useRouter } from "expo-router";
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

const StartPage5 = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={require("@/assets/images/sc-5-bg.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.subtitleWrap}>
            <Text style={styles.subtitle}>Trust & Value</Text>
          </View>

          <Text style={styles.title}>שערי חליפין טובים יותר, אבטחה מלאה</Text>
          <Text style={styles.description}>
            ערי חליפין בזמן אמת, אבטחה ברמת בנק, ואין עמלות נסתרות. הכסף שלכם
            מוגן שערי
          </Text>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        {/* onPress={() => navigation.replace("Home")} */}
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        {/* onPress={() => navigation.navigate("Onboarding2")} */}
        <TouchableOpacity onPress={() => router.replace("/start-page-6")}>
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
  imgContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: width * 0.85,
    height: height * 0.55,
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
    fontFamily: "NunitoRegular",
  },
  title: {
    fontSize: 36,
    textAlign: "right",
    marginBottom: 10,
    fontFamily: "NunitoExtraBold",
  },
  description: {
    textAlign: "right",
    color: "#666",
    fontSize: 16,
    marginBottom: 40,
    fontFamily: "NunitoRegular",
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

export default StartPage5;
