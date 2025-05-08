import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="setup-biometrics"
        options={{
          title: "Biometric Setup",
          presentation: "modal",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="biometric-failed"
        options={{
          title: "Authentication Failed",
          presentation: "modal",
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
