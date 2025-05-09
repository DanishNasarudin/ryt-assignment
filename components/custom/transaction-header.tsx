import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function TransactionHeader() {
  return (
    <ThemedView className="space-y-1 p-5 py-2 !bg-transparent">
      <ThemedText className="!text-2xl font-bold">Transactions</ThemedText>
    </ThemedView>
  );
}
