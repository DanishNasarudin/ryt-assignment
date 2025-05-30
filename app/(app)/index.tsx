import HomeDashboard from "@/components/custom/home-dashboard";
import { ThemedText } from "@/components/custom/themed-text";
import { ThemedView } from "@/components/custom/themed-view";
import Transaction from "@/components/custom/transaction";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/lib/providers/auth-provider";
import { useSearch } from "@/lib/providers/search-provider";
import { sortByDateDesc } from "@/lib/utils/format-date";
import {
  generateSampleTransactions,
  Transaction as TransactionType,
} from "@/lib/utils/sample-transactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const [data, setData] = useState<TransactionType[]>(
    sortByDateDesc(generateSampleTransactions())
  );
  const [refreshing, setRefreshing] = useState(false);
  const { search } = useSearch();

  const loadTransactions = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("sample_transactions");
      if (json) {
        const stored: TransactionType[] = JSON.parse(json);
        setData(sortByDateDesc(stored));
      } else {
        const fresh = generateSampleTransactions();
        setData(sortByDateDesc(fresh));
        await AsyncStorage.setItem(
          "sample_transactions",
          JSON.stringify(fresh)
        );
      }
    } catch {
      const fallback = generateSampleTransactions();
      setData(sortByDateDesc(fallback));
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(async () => {
      const fresh = generateSampleTransactions();
      setData(sortByDateDesc(fresh));
      await AsyncStorage.setItem("sample_transactions", JSON.stringify(fresh));
      setRefreshing(false);
    }, 1000);
  }, []);

  // This part is to fix the RefreshControl disappearing after router.back() function
  const [listKey, setListKey] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(false);
      setListKey((prev) => prev + 1);
    }, [])
  );
  // -----------------

  const totalAmount = data.reduce((total, { amount }) => total + amount, 0);

  if (!user)
    return (
      <ThemedView className="w-full h-full flex justify-center items-center">
        <IconSymbol size={64} name="faceid" color={"#808080"} />
        <ThemedText>Login with Face ID</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView className="!bg-secondary flex-1 pt-[110px]">
      <ScrollView
        key={listKey}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        {...(data.length === 0 || search !== ""
          ? { contentContainerStyle: { flex: 1 } }
          : {})}
      >
        <HomeDashboard amount={totalAmount} />
        <Transaction
          data={
            search !== ""
              ? data.filter((item) =>
                  item.description.toLowerCase().includes(search.toLowerCase())
                )
              : data
          }
        />
      </ScrollView>
    </ThemedView>
  );
}
