import { useTheme } from "@/lib/hooks/useTheme";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedView } from "./themed-view";

export default function DetailHeader() {
  const theme = useTheme();

  return (
    <SafeAreaView className="dark:dark h-0 pb-4">
      <ThemedView className="px-5 flex flex-row justify-between gap-4 w-screen">
        <TouchableOpacity
          className="dark:dark !text-accent bg-popover border-border border-[1px] w-12 h-12 flex justify-center items-center rounded-full"
          onPress={() => router.back()}
        >
          <IconSymbol
            name="chevron.backward"
            color={tailwindToHex("accent", theme)}
            size={16}
          />
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
