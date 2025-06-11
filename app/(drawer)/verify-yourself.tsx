import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View
} from "react-native";

import CheckBg from "@/assets/images/check.svg";

const VerifyScreen = () => {
  const CODE_LENGTH = 5;
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];

    if (text === "") {
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    const char = text.slice(-1); // Take last character only
    newCode[index] = char;
    setCode(newCode);

    if (index < CODE_LENGTH - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    } else {
      inputRefs.current[index]?.blur(); // dismiss keyboard
      setTimeout(() => {
        setModalVisible(true);
      }, 300);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];

      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = "";
        setCode(newCode);
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
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
              inputRefs.current[index] = ref;
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

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.checkmarkCircle}>
              {/* <Text style={styles.checkmark}>✓</Text> */}
              <CheckBg width={118} height={118} />
            </View>

            <Text style={styles.modalTitle}>Registration Successful</Text>
            <Text style={styles.modalSubtitle}>
              Congratulations, you have been successfully login. Please
              continue to start using our app.
            </Text>

            <LinearGradient
              colors={["#51C8F8", "#8F5CFF"]}
              start={{ x: .9, y: 3 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalButton}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButtonInner}>
                <Text style={styles.modalButtonText}>Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
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
    fontFamily: "NunitoExtraBold",
    marginBottom: 15,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: "NunitoRegular",
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
    fontFamily: "NunitoRegular",
    backgroundColor: "#fafafa",
  },
  activeInput: {
    borderColor: "#69B7FF",
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 40,
    alignItems: "center",
    position: "relative",
  },
  modalClose: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  checkmarkCircle: {
    // backgroundColor: "#00c853",
    width: 118,
    height: 118,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    color: "#fff",
    fontSize: 50,
    // fontFamily: "NunitoExtraBold",
  },
  modalTitle: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "NunitoExtraBold",
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: "NunitoRegular",
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    width: "80%",
    borderRadius: 25,
    paddingVertical: 0,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  modalButtonInner: {
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "NunitoBold",
  },
});

export default VerifyScreen;
