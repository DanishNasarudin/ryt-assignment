import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

export type ThemedViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const BodyScrollView = forwardRef<any, ThemedViewProps>((props, ref) => {
  const backgroundColor = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "background"
  );
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: 0 }}
      scrollIndicatorInsets={{ bottom: 0 }}
      style={[{ backgroundColor }]}
      {...props}
      ref={ref}
    />
  );
});
