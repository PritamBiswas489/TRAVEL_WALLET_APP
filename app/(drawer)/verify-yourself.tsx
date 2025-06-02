import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native";

const VerifyScreen = () => {
  const CODE_LENGTH = 5;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Auto focus first input on mount
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    if (!text) return;

    const newCode = [...code];
    const char = text.slice(-1); // Take last character
    newCode[index] = char;
    setCode(newCode);

    if (index < CODE_LENGTH - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();

        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify Yourself</Text>

      <Text style={styles.message}>
        We sent a code to +92 3170282343. Please enter the 5-digit code below.
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref as TextInput | null;
            }}
            style={[
              styles.codeInput,
              activeIndex === index && styles.activeInput,
            ]}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onFocus={() => setActiveIndex(index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            returnKeyType="done"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  codeInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    fontSize: 20,
    backgroundColor: "#fafafa",
  },
  activeInput: {
    borderColor: "#69B7FF",
    borderWidth: 1,
  },
});

export default VerifyScreen;
