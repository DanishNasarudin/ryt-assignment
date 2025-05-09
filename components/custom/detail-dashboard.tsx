import { useTheme } from "@/lib/hooks/useTheme";
import { useMask } from "@/lib/providers/mask-provider";
import { Transaction } from "@/lib/utils/sample-transactions";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import PlaceholderNoData from "./placeholder-no-data";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function DetailDashboard({ data }: { data?: Transaction }) {
  const theme = useTheme();
  const { mask, setMask } = useMask();

  if (!data) {
    return (
      <ThemedView className="space-y-1 p-5 py-4 pb-8 !bg-transparent flex-1 max-h-[200px]">
        <PlaceholderNoData />
      </ThemedView>
    );
  }

  const isSent = data.amount < 0;

  return (
    <ThemedView className="space-y-1 p-5 py-4 pb-8 !bg-transparent items-center gap-2">
      <ThemedView className="!bg-transparent border-zinc-200 dark:border-zinc-600 border-[1px] rounded-full w-16 h-16 justify-center items-center">
        <IconSymbol
          name="arrow.left.and.right"
          color={tailwindToHex("foreground", theme)}
        />
      </ThemedView>
      <ThemedText className="!text-base font-medium">
        {isSent ? "Sent" : "Received"}
      </ThemedText>
      <ThemedView className="!bg-transparent items-center gap-0">
        <ThemedView className="flex-row gap-4 items-center !bg-transparent">
          <ThemedText
            className={`!text-4xl font-bold text-foreground/50 ${
              !mask
                ? isSent
                  ? "!text-red-600 dark:!text-red-500"
                  : "!text-green-600 dark:!text-green-500"
                : ""
            }`}
          >
            {mask
              ? `${isSent ? "- RM " : "RM "}****`
              : `${isSent ? "- RM " : "RM "}${Math.abs(data.amount).toFixed(
                  2
                )}`}
          </ThemedText>
          <TouchableOpacity onPress={() => setMask()}>
            <IconSymbol
              name={!mask ? "eye" : "eye.slash"}
              color={tailwindToHex("accent", theme)}
            />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText className="!text-base font-medium">
          {isSent ? "To anonymous user" : "To your acount"}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
