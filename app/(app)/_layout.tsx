import HomeHeader from "@/components/custom/home-header";
import { useAuth } from "@/utils/providers/auth-provider";
import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  const { user } = useAuth();
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerTransparent: true,
              detachPreviousScreen: false,
            }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Transactions",
          headerShown: !!user,
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerTitle: "Details",
          headerShown: !!user,
        }}
      />
    </Stack>
  );
}
