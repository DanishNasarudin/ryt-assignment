import { useTheme } from "@/lib/hooks/useTheme";
import { useMask } from "@/lib/providers/mask-provider";
import { capitaliseFirst } from "@/lib/utils/capitalise-first";
import { formatDateString } from "@/lib/utils/format-date";
import { Transaction } from "@/lib/utils/sample-transactions";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function TransactionItem({ item }: { item: Transaction }) {
  const theme = useTheme();
  const { mask } = useMask();

  return (
    <ThemedView className="w-full px-5 py-4 !bg-transparent">
      <TouchableOpacity
        onPress={() => router.push(`/details/${item.id}`)}
        className="flex-row gap-4 items-center"
      >
        <ThemedView className="!bg-transparent w-12 h-12 justify-center items-center border-border border-[1px] rounded-full">
          <IconSymbol
            name="arrow.left.and.right"
            color={tailwindToHex("foreground", theme)}
            size={16}
          />
        </ThemedView>
        <ThemedView className="!bg-transparent flex-row justify-between flex-1">
          <ThemedView className="!bg-transparent">
            <ThemedText
              className="!text-base font-bold flex-1 max-w-[54vw]"
              numberOfLines={1}
            >
              {item.description}
            </ThemedText>
            <ThemedText className="!text-sm font-medium">
              {capitaliseFirst(item.type)} · {formatDateString(item.date)}
            </ThemedText>
          </ThemedView>
          <ThemedText
            className={`!text-base font-bold ${
              !mask
                ? item.amount < 0
                  ? "!text-red-600 dark:!text-red-500"
                  : "!text-green-600 dark:!text-green-500"
                : ""
            }`}
          >
            {mask
              ? "RM ****"
              : `${item.amount < 0 ? "- RM " : "RM "}${Math.abs(
                  item.amount
                ).toFixed(2)}`}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}
