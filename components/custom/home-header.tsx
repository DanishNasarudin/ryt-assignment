import { useSearch } from "@/lib/providers/search-provider";
import { tailwindToHex } from "@/lib/utils/tailwind-convert";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedView } from "./themed-view";

export default function HomeHeader() {
  const theme = useColorScheme() ?? "light";
  const userExist = false;
  const { search, setSearch } = useSearch();
  const [openSearch, setOpenSearch] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const targetWidth = screenWidth ? screenWidth * 0.66 : 200;
  const translate = useSharedValue(-targetWidth);

  useEffect(() => {
    translate.value = withTiming(openSearch ? 0 : -targetWidth, {
      duration: 300,
    });
    if (!openSearch) setSearch("");
  }, [openSearch]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));

  return (
    <SafeAreaView className="dark:dark h-0 pb-4">
      <ThemedView className="px-5 flex flex-row justify-between gap-4 w-screen">
        <TouchableOpacity
          className="dark:dark !text-accent bg-popover border-border border-[1px] w-12 h-12 flex justify-center items-center rounded-full"
          onPress={() => setOpenSearch((prev) => !prev)}
        >
          <IconSymbol
            name="magnifyingglass"
            color={tailwindToHex("accent", theme)}
            size={16}
          />
        </TouchableOpacity>
        <ThemedView className="flex-1 h-12 overflow-hidden rounded-full !bg-transparent">
          <Animated.View style={animatedStyle}>
            <TextInput
              className="flex-grow !h-12 p-2 px-4 bg-background border-border border-[1px] rounded-full text-foreground"
              onChangeText={setSearch}
              placeholder="Search transaction.."
              value={search}
            />
            {search !== "" && (
              <TouchableOpacity
                className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-[-70%]"
                onPress={() => setSearch("")}
              >
                <IconSymbol
                  name="x.circle.fill"
                  color={tailwindToHex("zinc-400", theme)}
                  size={16}
                />
              </TouchableOpacity>
            )}
          </Animated.View>
        </ThemedView>
        <TouchableOpacity>
          {userExist ? (
            <Image
              source={{ uri: "https://placehold.co/40/png" }}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <TouchableOpacity className="dark:dark w-12 h-12 rounded-full bg-popover border-border border-[1px] flex justify-center items-center">
              <IconSymbol
                name="person"
                color={tailwindToHex("accent", theme)}
                size={16}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
