import { Feather, Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// SVG imports
import ArrowDown from "@/assets/images/arrow-down.svg";
import ArrowUp from "@/assets/images/arrow-up.svg";
import FooterBG from "@/assets/images/footer-bg.svg";
import Send from "@/assets/images/send.svg";
import TopUp from "@/assets/images/topup.svg";
import LeftImg from "@/assets/images/trans-left.svg";
import RightImg from "@/assets/images/trans-right.svg";
import Wallet from "@/assets/images/wallet.svg";
import Withdraw from "@/assets/images/withdraw.svg";

// Correct type matching actual data
type Transaction = {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: "sent" | "received";
};

const { width: screenWidth } = Dimensions.get("window");
const curveWidth = screenWidth * 0.52;

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Yara Khalil",
    date: "Oct 14, 10:24 AM",
    amount: "-$15.00",
    status: "sent",
  },
  {
    id: "2",
    name: "Sara Ibrahim",
    date: "Oct 12, 02:12 PM",
    amount: "+$20.50",
    status: "received",
  },
  {
    id: "3",
    name: "Ahmad Ibrahim",
    date: "Oct 11, 01:19 PM",
    amount: "+$12.40",
    status: "received",
  },
  {
    id: "4",
    name: "Reem Khaled",
    date: "Oct 07, 09:10 PM",
    amount: "-$21.30",
    status: "sent",
  },
  {
    id: "5",
    name: "Hiba Saleh",
    date: "Oct 04, 05:45 AM",
    amount: "+$09.00",
    status: "received",
  },
];

type CurrencySelectorProps = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};

const CurrencySelector = ({ selectedCurrency, setSelectedCurrency }: CurrencySelectorProps) => {
  const currencies = [
    { label: 'US Dollar', value: 'USD', flag: require('@/assets/images/usa.png') },
    { label: 'Euro', value: 'EUR', flag: require('@/assets/images/eur.png') },
    { label: 'Thai Baht', value: 'THB', flag: require('@/assets/images/thb.png') },
  ];

  const selectedCurrencyData = currencies.find(c => c.value === selectedCurrency);

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.pickerContainerInner}>
        <Image source={selectedCurrencyData?.flag} style={styles.flagImage} />
        <Text style={styles.currencyText}>{selectedCurrencyData?.label}</Text>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item
              key={currency.value}
              label={currency.label}
              value={currency.value}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
        <Ionicons name="chevron-down" size={20} color="#fff" style={styles.arrow} />
      </View>
    </View>
  );
};

const Page2 = () => {
  const insets = useSafeAreaInsets();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      {/* Avatar + Arrow Badge */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("@/assets/images/user.png")}
          style={styles.userAvatar}
          resizeMode="cover"
        />
        <View style={styles.arrowBadge}>
          {item.status === "sent" ? (
            <ArrowUp width={16} height={16} fill="#FF3B30" />
          ) : (
            <ArrowDown width={16} height={16} fill="#34C759" />
          )}
        </View>
      </View>

      {/* Transaction Details */}
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      {/* Amount */}
      <Text
        style={[
          styles.transactionAmount,
          { color: item.status === "sent" ? "#FF3B30" : "#34C759" },
        ]}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: 0 }]}>
      <LinearGradient
        colors={["#29BDFC", "#a25cFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("@/assets/images/user.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>Alina Max</Text>
              <Text style={styles.userId}>ID 123456</Text>
            </View>
          </View>

          <View style={styles.notifiSettings}>
            <TouchableOpacity style={styles.iconBox}>
              <Feather name="bell" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox}>
              <Ionicons name="settings-outline" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <View style={styles.balanceRow}>
            <Ionicons name="wallet-outline" size={24} color="#FFF" style={styles.balanceIcon} />
            <Text style={styles.balanceAmount}>THB 15,901</Text>
          </View>
        </View>

        <View style={styles.currencySelectorWrapper}>
          <CurrencySelector
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        </View>

        <View style={styles.trnsBgLeft}>
          <LeftImg width={157} height={155} />
        </View>
        <View style={styles.trnsBgRight}>
          <RightImg width={103} height={206} />
        </View>
      </LinearGradient>

      <View style={styles.transactionsContainer}>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Withdraw width={28} height={28} />
            <Text style={styles.actionLabel}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Withdraw width={28} height={28} />
            <Text style={styles.actionLabel}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Send width={28} height={28} />
            <Text style={styles.actionLabel}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <TopUp width={28} height={28} />
            <Text style={styles.actionLabel}>Top Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Last Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Error Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Wallet height={95} width={126} />
            {/* <Ionicons name="wallet-outline" size={40} color="#1E90FF" />
            <Ionicons name="close-circle" size={24} color="red" style={styles.errorIcon} /> */}
            <Text style={styles.modalTitle}>Load Wallet Failed</Text>
            <Text style={styles.modalMessage}>Unable to load wallet. Please refresh</Text>
            <LinearGradient
              colors={["#1E90FF", "#A25CFC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueButton}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomNavCurveContainer}>
          <View style={styles.curveLeft} />
          <View style={styles.curveMid}>
            <FooterBG width={curveWidth} height={90} />
          </View>
          <View style={styles.curveRight} />
        </View>

        <View style={styles.bottomNavContent}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#6B48FF" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <View style={styles.qrButtonContainer}>
            <LinearGradient
              colors={["#8A62FF", "#5A3FFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.qrButton}
            >
              <TouchableOpacity>
                <Ionicons name="qr-code" size={30} color="#FFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="time" size={24} color="#6B48FF" />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  headerGradient: {
    paddingTop: 30,
    paddingBottom: 20,
    position: 'relative',
  },
  trnsBgLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: 157,
  },
  trnsBgRight: {
    position: 'absolute',
    right: 0,
    bottom: -50,
    height: '100%',
    width: 103,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 1,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 66,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  arrowBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "NunitoExtraBold",
  },
  userId: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "NunitoRegular",
  },
  notifiSettings: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBox: {
    marginLeft: 10,
    borderColor: 'rgba(255,255,255,.2)',
    borderWidth: 2,
    borderRadius: 12,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
    zIndex: 1
  },
  balanceLabel: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "NunitoRegular",
    marginBottom: 8
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  balanceIcon: {
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,.3)',
    padding: 6,
    borderRadius: 8
  },
  balanceAmount: {
    color: "#FFF",
    fontSize: 34,
    fontFamily: "NunitoExtraBold",
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontFamily: "NunitoExtraBold",
  },
  viewAll: {
    color: "#3491db",
    fontSize: 14,
    fontFamily: "NunitoExtraBold",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  transactionDetails: { flex: 1, marginLeft: 12 },
  transactionName: { fontSize: 16, fontWeight: "600" },
  transactionDate: { fontSize: 12, color: "#888", marginTop: 2 },
  transactionAmount: { fontSize: 16, fontFamily: "NunitoRegular" },
  bottomNav: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: "relative",
  },
  bottomNavCurveContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
  },
  curveLeft: {
    width: "40%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  curveMid: {
    position: "absolute",
    width: curveWidth,
    height: 90,
    left: (screenWidth - curveWidth) / 2,
    bottom: 0,
    zIndex: 2,
  },
  curveRight: {
    width: "40%",
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
    zIndex: 2,
  },
  qrButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -80,
  },
  qrButton: {
    borderRadius: 50,
    padding: 18,
    elevation: 20,
    shadowColor: "rgba(24, 95, 167, 1)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  navText: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500"
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: -60,
    marginBottom: 20,
    elevation: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionButton: {
    alignItems: "center",
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 15,
    fontFamily: "NunitoSamiBold",
    color: "#4f4f4f",
  },
  currencySelectorWrapper: {
    marginHorizontal: 20,
    marginBottom: 60,
    zIndex: 2,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  pickerContainerInner: {
    width: (screenWidth - curveWidth) / 1.3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 12,
    position: "relative",
  },
  flagImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  currencyText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "NunitoRegular",
  },
  picker: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: "NunitoRegular",
    color: "#000",
  },
  arrow: {
    marginLeft: "auto",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: screenWidth * 0.85, // Set width to 80% of screen width
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  // errorIcon: {
  //   position: "absolute",
  //   top: 40,
  //   right: 110,
  // },
  modalTitle: {
    fontSize: 20,
    fontFamily: "NunitoExtraBold",
    marginBottom: 10,
    marginTop: 20,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "NunitoRegular",
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "NunitoExtraBold",
    textAlign: "center",
  },
});

export default Page2;