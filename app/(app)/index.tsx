import HomeDashboard from "@/components/custom/home-dashboard";
import Transaction from "@/components/custom/transaction";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
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
  const [data, setData] = useState<TransactionType[]>(sampleTransactions);
  const [refreshing, setRefreshing] = useState(false);
  const backgroundColor = useThemeColor({}, "background");

  // This part is to fix the RefreshControl disappearing after router.back() function
  const [listKey, setListKey] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(false);
      setListKey((prev) => prev + 1);
    }, [])
  );
  // -----------------

  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    setTimeout((): void => {
      setData([...sampleTransactions]);
      setRefreshing(false);
    }, 1000);
  }, []);

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
        <HomeDashboard />
        <Transaction data={data} />
      </ScrollView>
    </ThemedView>
  );
}
