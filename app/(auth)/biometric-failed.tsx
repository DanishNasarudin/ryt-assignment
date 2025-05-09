import { ThemedText } from "@/components/custom/themed-text";
import { ThemedView } from "@/components/custom/themed-view";
import { useAuth } from "@/lib/providers/auth-provider";
import { authenticateWithBiometrics } from "@/lib/utils/biometrics";
import { router } from "expo-router";
import { Button } from "react-native";

export default function BiometricFailedScreen() {
  const { setUser } = useAuth();

  const handleRetry = async () => {
    const success = await authenticateWithBiometrics();
    if (success) {
      setUser({ name: "Anonymous" });
      router.replace("/(app)");
    }
  };

  return (
    <ThemedView className="w-full h-full flex justify-center items-center p-6">
      <ThemedText className="!text-2xl font-bold mb-2">
        Authentication Failed
      </ThemedText>
      <ThemedText className="!text-base !text-zinc-400 dark:!text-zinc-600 mb-6">
        We couldn't verify your identity.
      </ThemedText>
      <Button title="Try Again" onPress={handleRetry} />
    </ThemedView>
  );
}
