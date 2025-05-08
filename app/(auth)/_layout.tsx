import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
            }),
      }}
    >
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
