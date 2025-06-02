import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

const Page1 = () => {
  
  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>New page</Text>
      <Text style={styles.subtitle}>
        New page
      </Text>

       
       

     
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

export default Page1;
