import Detail from "@/components/custom/detail";
import DetailDashboard from "@/components/custom/detail-dashboard";
import { ThemedView } from "@/components/ThemedView";
import { Transaction } from "@/utils/sample-transactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<Transaction | null>(null);

  const loadTransactions = useCallback(async () => {
    const json = await AsyncStorage.getItem("sample_transactions");
    if (json) {
      const stored: Transaction[] = JSON.parse(json);
      setData(stored.find((item) => item.id === id) || null);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <ThemedView className="!bg-secondary flex-1 pt-[110px]">
      <DetailDashboard data={data || undefined} />
      <Detail data={data || undefined} />
    </ThemedView>
  );
}
