import { useAuth } from "@/utils/auth-provider";
import { authenticateWithBiometrics } from "@/utils/biometrics";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

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
    <View className="w-full h-full flex justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-2">Authentication Failed</Text>
      <Text className="text-base text-zinc-600 mb-6">
        We couldn't verify your identity.
      </Text>
      <Button title="Try Again" onPress={handleRetry} />
    </View>
  );
}
