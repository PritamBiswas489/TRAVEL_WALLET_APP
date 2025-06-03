import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgetPassword = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+92 3170282343");

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Forget Password?</Text>

      {/* Description */}
      <Text style={styles.description}>
        Enter your number to reset your password. We will send the code to the
        email so you can reset password
      </Text>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Image
          source={require("@/assets/images/phone.png")}
          style={styles.phoneIcon}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* Buttons */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.whatsappButton]}>
          <Text style={styles.buttonText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.smsButton]}>
          <Text style={styles.buttonText}>SMS</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.whatsappButton}>
          <Image
            source={require("@/assets/images/whatsapp.png")}
            style={styles.whatsappImage}
          />
          <Text style={styles.whatsappButtonText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smsButton}
          onPress={() => router.push("/verify-yourself")}
        >
          <Image
            source={require("@/assets/images/sms.png")}
            style={styles.whatsappImage}
          />
          <Text style={styles.smsButtonText}>SMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: "#fff",
    // justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#23262F",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#60A5FA",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#fafafa",
  },
  phoneIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 18,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 8,
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
});

export default ForgetPassword;
