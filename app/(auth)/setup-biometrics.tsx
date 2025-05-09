import { ThemedText } from "@/components/custom/themed-text";
import { ThemedView } from "@/components/custom/themed-view";
import { useAuth } from "@/lib/providers/auth-provider";
import { authenticateWithBiometrics } from "@/lib/utils/biometrics";
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
      <ThemedText className="!text-2xl font-bold">
        Enable biometric login?
      </ThemedText>
      <Button title="Enable" onPress={enableBiometrics} />
    </ThemedView>
  );
}
