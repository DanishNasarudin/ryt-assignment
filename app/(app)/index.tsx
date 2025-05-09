import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/utils/auth-provider";
import { sampleTransactions, Transaction } from "@/utils/sample-transactions";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, ListRenderItemInfo, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const [data, setData] = useState<Transaction[]>(sampleTransactions);
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, "background");

  const handleRefresh = () => {
    setRefreshing(true);
    setData(sampleTransactions);

    // mock fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (!user)
    return (
      <ThemedView className="w-full h-full flex justify-center items-center">
        <IconSymbol size={64} name="faceid" color={"#808080"} />
        <ThemedText>Login</ThemedText>
      </ThemedView>
    );

  return (
    <FlatList<Transaction>
      className="w-full h-full p-5 pt-[56px]"
      style={[{ backgroundColor }]}
      data={data}
      keyExtractor={(tx) => tx.id}
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: 0 }}
      scrollIndicatorInsets={{ bottom: 0 }}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      renderItem={({ item }: ListRenderItemInfo<Transaction>) => (
        <ThemedView className="w-full mb-4">
          <TouchableOpacity onPress={() => router.push(`/details/${item.id}`)}>
            <ThemedText className="font-bold">{item.description}</ThemedText>
            <ThemedText>{item.date}</ThemedText>
            <ThemedText>
              {item.type.toUpperCase()} - ${item.amount.toFixed(2)}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    />
  );
}
