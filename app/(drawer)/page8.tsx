import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import LeftImg from "@/assets/images/trans-left.svg";
import RightImg from "@/assets/images/trans-right.svg";

// SVG flag components

const { width: screenWidth } = Dimensions.get("window");
const curveWidth = screenWidth * 0.52;


const Page7 = () => {







    return (
        <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
            <LinearGradient
                colors={["#29BDFC", "#a25cFC"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.7, y: 1 }}
                style={styles.headerGradient}
            >
                {/* Header with Back Arrow and Title */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.backArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Currency Converter</Text>
                    <View style={styles.headerSpacer} />
                </View>
                <View style={styles.trnsBgLeft}>
                    <LeftImg width={157} height={155} />
                </View>
                <View style={styles.trnsBgRight}>
                    <RightImg width={103} height={206} />
                </View>
            </LinearGradient>

            {/* Currency Converter Section */}
            <View style={styles.converterContainer}>
                {/* Amount Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount</Text>

                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    headerGradient: {
        paddingTop: 20,
        paddingBottom: 0,
        position: "relative",
    },
    trnsBgLeft: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: 157,
    },
    trnsBgRight: {
        position: "absolute",
        right: 0,
        bottom: -50,
        height: "100%",
        width: 103,
    },
    converterContainer: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        paddingHorizontal: 22,
        paddingVertical: 40,
        paddingBottom: 16,
        marginTop: -10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 25,
    },
    backArrow: {
        fontSize: 40,
        color: "#FFF",
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: "NunitoExtraBold",
        color: "#FFF",
        flex: 1,
        textAlign: "center",
    },
    headerSpacer: {
        width: 24,
    },
    inputContainer: {
        marginBottom: 10,
        paddingHorizontal: 20
    },
    label: {
        fontSize: 16,
        fontFamily: "NunitoRegular",
        color: "#666",
        marginBottom: 5,
    },

});

export default Page7;