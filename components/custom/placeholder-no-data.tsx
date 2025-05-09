import { useTheme } from "@/hooks/useTheme";
import { tailwindToHex } from "@/utils/tailwind-convert";
import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

export default function PlaceholderNoData() {
  const theme = useTheme();
  return (
    <ThemedView className="!bg-transparent flex-1 justify-center items-center">
      <IconSymbol
        name="exclamationmark.triangle"
        color={tailwindToHex("zinc-400", theme)}
        size={64}
      />
      <ThemedText className="!text-2xl font-bold !text-zinc-400">
        No Data
      </ThemedText>
    </ThemedView>
  );
}
