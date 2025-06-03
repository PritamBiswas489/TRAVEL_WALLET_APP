import { useRouter } from "expo-router"; // ✅ Import router for navigation
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+923170282343");

  const router = useRouter(); // ✅ Use useRouter hook

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sign In</Text>
      </View> */}

      {/* Phone Number Input */}
      <Text style={styles.label}>Enter Your Phone Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>🇺🇸 +1</Text>
        <Image
          source={require("../assets/images/ico-dropdown.png")}
          style={styles.dropdownImg}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text: string) => setPhoneNumber(text)}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.whatsappButton}>
          <Image
            source={require("../assets/images/whatsapp.png")}
            style={styles.whatsappImage}
          />
          <Text style={styles.whatsappButtonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smsButton}
          onPress={() => router.push("(tabs)/verification")} // ✅ Correct navigation
        >
          <Image
            source={require("../assets/images/sms.png")}
            style={styles.whatsappImage}
          />
          <Text style={styles.smsButtonText}>SMS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
    color: "#000",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#29BDFC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  countryCode: {
    fontSize: 16,
    color: "#000",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whatsappButton: {
    flexDirection: "row",
    backgroundColor: "#00B164",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappImage: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
  smsButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  smsButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },

  dropdownImg: {
    marginLeft: 5,
  },
});
