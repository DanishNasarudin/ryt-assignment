import { useTheme } from "@/lib/hooks/useTheme";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import React from "react";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

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
