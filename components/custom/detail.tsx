import { capitaliseFirst } from "@/utils/capitalise-first";
import { formatDateFull } from "@/utils/format-date";
import { Transaction } from "@/utils/sample-transactions";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import PlaceholderNoData from "./placeholder-no-data";

export default function Detail({ data }: { data?: Transaction }) {
  if (!data) {
    return (
      <ThemedView className="!bg-background flex-1 overflow-hidden rounded-3xl border-border border-[1px] px-5 py-4">
        <ThemedText className="!text-2xl font-bold">
          Transaction details
        </ThemedText>
        <PlaceholderNoData />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="!bg-background flex-1 overflow-hidden rounded-3xl border-border border-[1px] px-5 py-4 gap-4">
      <ThemedText className="!text-2xl font-bold">
        Transaction details
      </ThemedText>
      <ThemedView className="!bg-transparent flex-row justify-between">
        <ThemedText className="!text-base">Description</ThemedText>
        <ThemedText className="!text-base">{data.description}</ThemedText>
      </ThemedView>
      <ThemedView className="!bg-transparent flex-row justify-between">
        <ThemedText className="!text-base">Transaction type</ThemedText>
        <ThemedText className="!text-base">
          {capitaliseFirst(data.type)}
        </ThemedText>
      </ThemedView>
      <View className="border-border border-[1px] border-dashed" />
      <ThemedView className="!bg-transparent flex-row justify-between">
        <ThemedText className="!text-base">Transaction number</ThemedText>
        <ThemedText className="!text-base">{data.id}</ThemedText>
      </ThemedView>
      <ThemedView className="!bg-transparent flex-row justify-between">
        <ThemedText className="!text-base">Transaction date</ThemedText>
        <ThemedText className="!text-base">
          {formatDateFull(data.date)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
