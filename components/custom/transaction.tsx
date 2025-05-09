import { Transaction as TransactionType } from "@/utils/sample-transactions";
import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { ThemedView } from "../ThemedView";
import TransactionHeader from "./transaction-header";
import TransactionItem from "./transaction-item";

export default function Transaction({
  data = [],
}: {
  data?: TransactionType[];
}) {
  return (
    <ThemedView className="!bg-background py-4 border-border border-[1px] rounded-3xl">
      <FlatList<TransactionType>
        data={data}
        scrollEnabled={false}
        keyExtractor={(tx) => tx.id}
        ListHeaderComponent={() => <TransactionHeader />}
        renderItem={({ item }: ListRenderItemInfo<TransactionType>) => (
          <TransactionItem item={item} />
        )}
      />
    </ThemedView>
  );
}
