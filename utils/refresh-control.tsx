import { useEffect, useState } from "react";
import {
  RefreshControlProps,
  RefreshControl as RefreshControlRN,
} from "react-native";

export function RefreshControl({ refreshing, ...other }: RefreshControlProps) {
  const [isRefreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRefreshing(refreshing);
    }, 10);
  }, [refreshing]);
  return <RefreshControlRN refreshing={isRefreshing} {...other} />;
}
