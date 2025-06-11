import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const CreatePasscode = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Passcode</Text>
      <Text style={styles.subtitle}>Your 4-digit code to unlock the app</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => {
          const isFocused = focusedIndex === index;
          const isEmpty = digit === "";

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputsRef.current[index] = ref;
              }}
              value={digit ? "*" : ""} // Show "*" if there's a value
              onChangeText={(value) => handleChange(index, value)}
              keyboardType="numeric"
              maxLength={1}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              style={[
                styles.codeInput,
                isFocused && styles.activeInput,
                !isFocused && isEmpty && styles.droppedInput,
              ]}
              textAlign="center"
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "NunitoExtraBold",
    color: "#23262f",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "NunitoRegular",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  codeInput: {
    width: 58,
    height: 58,
    borderWidth: 1,
    borderColor: "#f4f6f9",
    borderRadius: 16,
    fontSize: 24,
    fontFamily: "NunitoRegular",
    backgroundColor: "#fafafa",
  },
  activeInput: {
    borderColor: "#29BDFC",
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  droppedInput: {
    backgroundColor: "#fff",
  },

});

export default CreatePasscode;
