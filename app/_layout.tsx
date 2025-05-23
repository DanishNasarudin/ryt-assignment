import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/lib/hooks/useColorScheme";
import Providers from "@/lib/providers";
import "../global.css";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // useEffect(() => {
  //   if (__DEV__) {
  //     AsyncStorage.clear().then(() => {
  //       console.log("✅ AsyncStorage cleared");
  //       DevSettings.reload(); // Optional: auto reload app
  //     });
  //   }
  // }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Providers>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Providers>
  );
}
