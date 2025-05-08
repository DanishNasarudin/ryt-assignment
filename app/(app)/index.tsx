import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/utils/auth-provider";
import { sampleTransactions, Transaction } from "@/utils/sample-transactions";
import { router } from "expo-router";
import React from "react";
import { FlatList, ListRenderItemInfo, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  if (!user)
    return (
      <ThemedView className="w-full h-full flex justify-center items-center">
        <IconSymbol size={64} name="faceid" color={"#808080"} />
        <ThemedText>Login</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView className="w-full h-full flex flex-col items-center gap-4 p-5 pt-20">
      <FlatList<Transaction>
        className="w-full"
        data={sampleTransactions}
        keyExtractor={(tx) => tx.id}
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        renderItem={({ item }: ListRenderItemInfo<Transaction>) => (
          <ThemedView className="w-full mb-4">
            <TouchableOpacity
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <ThemedText>{item.description}</ThemedText>
              <ThemedText>{item.date}</ThemedText>
              <ThemedText>
                {item.type.toUpperCase()} – ${item.amount.toFixed(2)}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}
