import Detail from "@/components/custom/detail";
import DetailDashboard from "@/components/custom/detail-dashboard";
import { ThemedView } from "@/components/ThemedView";
import { sampleTransactions } from "@/utils/sample-transactions";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const details = sampleTransactions.filter((item) => item.id === id);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    setTimeout((): void => {
      // setData(sortByDateDesc(sampleTransactions));
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

  return (
    <ThemedView className="!bg-secondary flex-1 pt-[110px]">
      <DetailDashboard data={details[0]} />
      <Detail data={details[0]} />
    </ThemedView>
  );
}
