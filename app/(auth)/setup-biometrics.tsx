import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/utils/auth-provider";
import { authenticateWithBiometrics } from "@/utils/biometrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button } from "react-native";

export default function SetupBiometrics() {
  const { setUser } = useAuth();
  const enableBiometrics = async () => {
    const success = await authenticateWithBiometrics();
    if (success) {
      setUser({ name: "Anonymous" });
      await AsyncStorage.setItem("biometricEnabled", "true");
      router.replace("/(app)");
    }
  };

  return (
    <ThemedView className="flex justify-center items-center">
      <ThemedText>Enable biometric login?</ThemedText>
      <Button title="Enable" onPress={enableBiometrics} />
    </ThemedView>
  );
}
