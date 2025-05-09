import HomeDashboard from "@/components/custom/home-dashboard";
import Transaction from "@/components/custom/transaction";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/utils/auth-provider";
import {
  sampleTransactions,
  Transaction as TransactionType,
} from "@/utils/sample-transactions";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const [data, setData] = useState<TransactionType[]>(
    sortByDateDesc(sampleTransactions)
  );
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    setTimeout((): void => {
      setData(sortByDateDesc(sampleTransactions));
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
        <ThemedText>Login</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView
      className="rounded-3xl !bg-secondary"
      style={{ flex: 1, paddingTop: 110 }}
    >
      <ScrollView
        key={listKey}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <HomeDashboard amount={totalAmount} />
        <Transaction data={data} />
      </ScrollView>
    </ThemedView>
  );
}

const sortByDateDesc = (txs: TransactionType[]): TransactionType[] =>
  [...txs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
