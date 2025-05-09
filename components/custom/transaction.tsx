import { Transaction as TransactionType } from "@/utils/sample-transactions";
import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import PlaceholderNoData from "./placeholder-no-data";
import TransactionItem from "./transaction-item";

export default function Transaction({
  data = [],
}: {
  data?: TransactionType[];
}) {
  if (data.length === 0 || !data) {
    return (
      <ThemedView className="!bg-background py-4 border-border border-[1px] rounded-3xl flex-1">
        <ThemedView className="space-y-1 p-5 py-2 !bg-transparent">
          <ThemedText className="!text-2xl font-bold">Transactions</ThemedText>
        </ThemedView>
        <PlaceholderNoData />
      </ThemedView>
    );
  }
  return (
    <ThemedView className="!bg-background py-4 border-border border-[1px] rounded-3xl">
      <FlatList<TransactionType>
        data={data}
        scrollEnabled={false}
        keyExtractor={(tx) => tx.id}
        ListHeaderComponent={() => (
          <ThemedView className="space-y-1 p-5 py-2 !bg-transparent">
            <ThemedText className="!text-2xl font-bold">
              Transactions
            </ThemedText>
          </ThemedView>
        )}
        renderItem={({ item }: ListRenderItemInfo<TransactionType>) => (
          <TransactionItem item={item} />
        )}
      />
    </ThemedView>
  );
}
