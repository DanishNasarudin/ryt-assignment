import HeaderHome from "@/components/custom/header-home";
import { useAuth } from "@/utils/auth-provider";
import { Stack } from "expo-router/stack";
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
            }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Transactions",
          headerShown: !!user,
          header: () => <HeaderHome />,
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
