import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const VerificationCodeInput = () => {
  const [code, setCode] = useState<string[]>(["1", "", "", ""]); // Pre-filled with the first digit

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent the code verification to your mobile number
      </Text>

      {/* Code Input Boxes */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            style={[
              styles.codeInput,
              index === 1 && styles.activeInput, // Highlight the second box as active
            ]}
            textAlign="center"
          />
        ))}
      </View>

      {/* Resend Code Link */}
      <TouchableOpacity>
        <Text style={styles.resendText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 24,
    backgroundColor: "#fff",
  },
  activeInput: {
    borderColor: "#1E90FF",
    borderWidth: 2,
  },
  resendText: {
    color: "#1E90FF",
    fontSize: 16,
    marginTop: 24,
  },
});

export default VerificationCodeInput;
