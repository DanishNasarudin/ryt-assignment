import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/utils/auth-provider";
import React from "react";

export default function HomeScreen() {
  const { user } = useAuth();

  if (!user)
    return (
      <ThemedView className="w-full h-full flex justify-center items-center">
        <IconSymbol size={64} name="faceid" color={"#808080"} />
        <ThemedText>Login</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView className="w-full h-full flex justify-center items-center">
      <ThemedText type="title">Home Screens</ThemedText>
    </ThemedView>
  );
}
