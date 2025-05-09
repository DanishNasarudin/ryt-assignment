import { useTheme } from "@/lib/hooks/useTheme";
import { useMask } from "@/lib/providers/mask-provider";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function HomeDashboard({ amount = -10.0 }: { amount?: number }) {
  const theme = useTheme();
  const { mask, setMask } = useMask();

  return (
    <ThemedView className="space-y-1 p-5 py-4 pb-8 !bg-transparent">
      <ThemedText className="!text-base font-medium">Total Balance</ThemedText>
      <ThemedView className="flex-row gap-4 items-center !bg-transparent">
        <ThemedText className="!text-4xl font-bold text-foreground/50">
          RM {mask ? "****" : amount.toFixed(2)}
        </ThemedText>
        <TouchableOpacity onPress={() => setMask()}>
          <IconSymbol
            name={!mask ? "eye" : "eye.slash"}
            color={tailwindToHex("accent", theme)}
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
