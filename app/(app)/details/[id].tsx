import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { sampleTransactions } from "@/utils/sample-transactions";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const details = sampleTransactions.filter((item) => item.id === id);

  return (
    <ThemedView>
      <ScrollView
        className="w-full h-full p-5"
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        // contentInset={{ bottom: 0 }}
        // scrollIndicatorInsets={{ bottom: 0 }}
      >
        <ThemedText type="subtitle">Name: {details[0].description}</ThemedText>
        <ThemedText type="subtitle">Date: {details[0].date}</ThemedText>
        <ThemedText type="subtitle">Type: {details[0].type}</ThemedText>
        <ThemedText type="subtitle">Amount: {details[0].amount}</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
