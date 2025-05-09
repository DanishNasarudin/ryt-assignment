import { Transaction } from "@/utils/sample-transactions";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function TransactionItem({ item }: { item: Transaction }) {
  return (
    <ThemedView className="w-full px-5 py-1 !bg-transparent">
      <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
        <ThemedText className="font-bold">{item.description}</ThemedText>
        <ThemedText>{item.date}</ThemedText>
        <ThemedText>
          {item.type.toUpperCase()} - ${item.amount.toFixed(2)}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
