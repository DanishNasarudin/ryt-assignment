import { useTheme } from "@/hooks/useTheme";
import { useMask } from "@/utils/providers/mask-provider";
import { tailwindToHex } from "@/utils/tailwind-convert";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

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
