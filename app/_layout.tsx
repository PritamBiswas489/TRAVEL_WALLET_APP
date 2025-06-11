import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  // Alert.alert(
  //   'Welcome to the Expo Router Starter App!',)
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    NunitoLight: require("../assets/fonts/NunitoSans-Light.ttf"),
    NunitoRegular: require("../assets/fonts/NunitoSans-Regular.ttf"),
    NunitoSamiBold: require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    NunitoBold: require("../assets/fonts/NunitoSans-Bold.ttf"),
    NunitoBlack: require("../assets/fonts/NunitoSans-Black.ttf"),
    NunitoExtraBold: require("../assets/fonts/NunitoSans-ExtraBold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  //create login page below

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="start-page" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="start-page-1" options={{ headerShown: false }} />
        <Stack.Screen name="start-page-2" options={{ headerShown: false }} />
        <Stack.Screen name="start-page-3" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
