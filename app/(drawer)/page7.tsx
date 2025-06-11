import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import Dropdown from "@/assets/images/dropdown.svg";
import LeftImg from "@/assets/images/trans-left.svg";
import RightImg from "@/assets/images/trans-right.svg";
import UpDownArrow from "@/assets/images/up-down-arrow.svg";

// SVG flag components
import EUFlag from "@/assets/images/eu.svg";
import IsraelFlag from "@/assets/images/il.svg";
import USFlag from "@/assets/images/us.svg";

const { width: screenWidth } = Dimensions.get("window");
const curveWidth = screenWidth * 0.52;

const currencyOptions: {
    label: string;
    value: string;
    flag: React.ReactNode;
    rateToUSD: number;
}[] = [
        {
            label: "ILS",
            value: "ILS",
            flag: <IsraelFlag width={42} height={42} />,
            rateToUSD: 0.29
        },
        {
            label: "USD",
            value: "USD",
            flag: <USFlag width={42} height={42} />,
            rateToUSD: 1.0
        },
        {
            label: "EUR",
            value: "EUR",
            flag: <EUFlag width={42} height={42} />,
            rateToUSD: 1.07
        },
    ];

const Page7 = () => {
    const [amount, setAmount] = useState("5000");
    const [convertedAmount, setConvertedAmount] = useState("45");
    const [fromCurrency, setFromCurrency] = useState("ILS");
    const [toCurrency, setToCurrency] = useState("USD");
    const [fromModalVisible, setFromModalVisible] = useState(false);
    const [toModalVisible, setToModalVisible] = useState(false);
    const [fromPosition, setFromPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [toPosition, setToPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card1");

    // Calculate exchange rate and converted amount
    useEffect(() => {
        const fromOption = currencyOptions.find((c) => c.value === fromCurrency);
        const toOption = currencyOptions.find((c) => c.value === toCurrency);

        if (fromOption && toOption) {
            const exchangeRate = toOption.rateToUSD / fromOption.rateToUSD;
            const converted = (parseFloat(amount || "0") * exchangeRate).toFixed(2);
            setConvertedAmount(converted.toString());
        } else {
            setConvertedAmount("0");
        }
    }, [amount, fromCurrency, toCurrency]);

    const getExchangeRateText = () => {
        const fromOption = currencyOptions.find((c) => c.value === fromCurrency);
        const toOption = currencyOptions.find((c) => c.value === toCurrency);

        if (fromOption && toOption) {
            const rate = (toOption.rateToUSD / fromOption.rateToUSD).toFixed(2);
            return `1 ${fromCurrency} = ${rate} ${toCurrency}`;
        }
        return "Exchange rate unavailable";
    };

    const getFlagComponent = (currency: string) => {
        const option = currencyOptions.find((c) => c.value === currency);
        return option ? option.flag : null;
    };

    const renderCurrencyItem = ({
        item,
        onPress,
    }: {
        item: typeof currencyOptions[number];
        onPress: (value: string) => void;
    }) => (
        <TouchableOpacity style={styles.dropdownItem} onPress={() => onPress(item.value)}>
            <View style={styles.flagContainer}>
                {item.flag}
            </View>
            <Text style={styles.dropdownItemText}>{item.label}</Text>
        </TouchableOpacity>
    );

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
                    <View style={styles.inputRow}>
                        <View style={styles.currencyContainer}>

                            <TouchableOpacity
                                onPress={() => setFromModalVisible(true)}
                                onLayout={(event) => {
                                    const { x, y, width, height } = event.nativeEvent.layout;
                                    setFromPosition({ x, y, width, height });
                                }}
                                style={styles.currencyContainerInner}
                            >
                                <View style={styles.flagContainer}>
                                    {getFlagComponent(fromCurrency)}
                                </View>
                                <Text style={styles.currencyCode}>{fromCurrency}</Text>
                                <Dropdown />
                            </TouchableOpacity>
                            {/* <Text style={styles.dot}>•</Text> */}

                        </View>
                        <TextInput
                            style={styles.input}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                    </View>
                </View>

                {/* From Currency Modal */}
                <Modal
                    visible={fromModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setFromModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setFromModalVisible(false)}
                    >
                        <View
                            style={[
                                styles.dropdownContainer,
                                {
                                    position: "absolute",
                                    top: fromPosition.y + fromPosition.height + 130,
                                    left: fromPosition.x + 40,
                                },
                            ]}
                        >
                            <FlatList
                                data={currencyOptions}
                                renderItem={({ item }) =>
                                    renderCurrencyItem({
                                        item,
                                        onPress: (value) => {
                                            setFromCurrency(value);
                                            setFromModalVisible(false);
                                        },
                                    })
                                }
                                keyExtractor={(item) => item.value}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Conversion Arrow */}
                <View style={styles.arrowContainer}>
                    <TouchableOpacity style={styles.arrowCircleImg}>
                        <UpDownArrow width={32} height={32} />
                    </TouchableOpacity>
                    <View style={styles.line} >
                        <View style={styles.lineInner} />
                    </View>
                </View>

                {/* Converted Amount */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Converted Amount</Text>
                    <View style={styles.inputRow}>
                        <View style={styles.currencyContainer}>

                            <TouchableOpacity
                                onPress={() => setToModalVisible(true)}
                                onLayout={(event) => {
                                    const { x, y, width, height } = event.nativeEvent.layout;
                                    setToPosition({ x, y, width, height });
                                }}
                                style={styles.currencyContainerInner}
                            >
                                <View style={styles.flagContainer}>
                                    {getFlagComponent(toCurrency)}
                                </View>
                                <Text style={styles.currencyCode}>{toCurrency}</Text>
                                <Dropdown />
                            </TouchableOpacity>
                            {/* <Text style={styles.dot}>•</Text> */}
                        </View>
                        <TextInput
                            style={styles.input}
                            value={convertedAmount}
                            onChangeText={setConvertedAmount}
                            keyboardType="numeric"
                            placeholder="0"
                        />
                    </View>
                </View>

                {/* To Currency Modal */}
                <Modal
                    visible={toModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setToModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setToModalVisible(false)}
                    >
                        <View
                            style={[
                                styles.dropdownContainer,
                                {
                                    position: "absolute",
                                    top: toPosition.y + toPosition.height + 220,
                                    left: toPosition.x + 40,
                                },
                            ]}
                        >
                            <FlatList
                                data={currencyOptions}
                                renderItem={({ item }) =>
                                    renderCurrencyItem({
                                        item,
                                        onPress: (value) => {
                                            setToCurrency(value);
                                            setToModalVisible(false);
                                        },
                                    })
                                }
                                keyExtractor={(item) => item.value}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Exchange Rate */}
                <Text style={styles.exchangeRate}>Indicative Exchange Rate</Text>
                <Text style={styles.exchangeRateValue}>{getExchangeRateText()}</Text>

                {/* Payment Method */}
                <View style={styles.paymentHeader}>
                    <Text style={styles.sectionTitle}>Select Payment Method</Text>
                    <TouchableOpacity style={styles.addNewButton}>
                        <Text style={styles.addNewText}>Add New</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => setSelectedPaymentMethod("card1")}
                >
                    {/* <Card style={styles.paymentIcon} /> */}
                    {/* <Image source={{ uri: cardIcon }} style={styles.paymentIcon} /> */}
                    <Image
                        source={require("@/assets/images/card.png")}
                        style={styles.paymentIcon}
                        resizeMode="cover"
                    />
                    <Text style={styles.paymentText}>**** 3456</Text>
                    <View
                        style={
                            selectedPaymentMethod === "card1"
                                ? styles.radioCircleSelected
                                : styles.radioCircle
                        }
                    >
                        {selectedPaymentMethod === "card1" && (
                            <View style={styles.radioCircleInner} />
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => setSelectedPaymentMethod("card2")}
                >
                    <Image
                        source={require("@/assets/images/visa.png")}
                        style={styles.paymentIcon}
                        resizeMode="cover"
                    />
                    <Text style={styles.paymentText}>Credit 4567</Text>
                    <View
                        style={
                            selectedPaymentMethod === "card2"
                                ? styles.radioCircleSelected
                                : styles.radioCircle
                        }
                    >
                        {selectedPaymentMethod === "card2" && (
                            <View style={styles.radioCircleInner} />
                        )}
                    </View>
                </TouchableOpacity>

                {/* Confirm Button */}
                <LinearGradient
                    colors={["#A25CFC", "#1E90FF"]}
                    start={{ x: 1, y: 1 }}   // bottom right
                    end={{ x: 0, y: 0 }}     // top left
                    style={styles.continueButton}
                >
                    <TouchableOpacity style={styles.confirmButton} >
                        <Text style={styles.confirmButtonText}>Confirm & Load Wallet</Text>
                    </TouchableOpacity>
                </LinearGradient>
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
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    currencyContainer: {

        width: (screenWidth - curveWidth) / 1.3,
    },
    currencyContainerInner: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    flagContainer: {
        width: 42,
        height: 42,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currencyCode: {
        fontSize: 20,
        color: "#333",
        fontFamily: "NunitoBold",
        marginRight: 5,
    },
    dot: {
        fontSize: 16,
        color: "#333",
        marginHorizontal: 6,
        fontWeight: "500",
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: "#000",
        textAlign: "left",
        fontFamily: "NunitoRegular",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: "#29BDFC",
        borderRadius: 16,
        backgroundColor: '#fafafa'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "transparent",
    },
    dropdownContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        width: 120,
        paddingVertical: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    dropdownItem: {
        paddingVertical: 2,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
        marginLeft: 10,
    },
    arrowContainer: {
        alignItems: "center",
        marginVertical: 5,
        position: 'relative'
    },
    arrowCircleImg: {
        backgroundColor: "#fff",
        borderRadius: 40,
        width: 60,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    line: {
        position: 'absolute',
        top: 19,
        width: '100%',
        height: 2,
        paddingHorizontal: 22,
        zIndex: -1
    },
    lineInner: {
        backgroundColor: '#d5d5d5',
        width: '100%',
        height: 1,
    },
    exchangeRate: {
        fontSize: 16,
        color: "#111014",
        textAlign: "center",
        marginTop: 5,
        fontFamily: "NunitoRegular",
    },
    exchangeRateValue: {
        fontSize: 18,
        fontFamily: "NunitoExtraBold",
        color: "#111014",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 20,
    },
    paymentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#222222",
        fontFamily: "NunitoRegular",
    },
    addNewButton: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    addNewText: {
        color: "#626262",
        fontSize: 16,
        fontFamily: "NunitoRegular",
    },
    paymentOption: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    paymentIcon: {
        width: 42,
        height: 36,
        marginRight: 10,
    },
    paymentText: {
        fontSize: 16,
        color: "#222222",
        flex: 1,
        fontFamily: "NunitoRegular",
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFF",
    },
    radioCircleSelected: {
        width: 24,
        height: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#a25cFC",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    radioCircleInner: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#a25cFC",
    },
    continueButton: {
        borderRadius: 30,
        marginTop: 15,
    },

    confirmButton: {
        paddingVertical: 18,
        paddingHorizontal: 20,
    },
    confirmButtonText: {
        color: "white",
        fontSize: 18,
        fontFamily: "NunitoExtraBold",
        textAlign: "center",
    },

});

export default Page7;