import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/lib/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      style={[{ backgroundColor }, style]}
      className={`dark:!dark ${className}`}
      {...otherProps}
    />
  );
}
