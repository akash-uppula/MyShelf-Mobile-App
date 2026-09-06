import { Pressable, Text, useColorScheme } from "react-native";

import Colors from "../constants/Colors";

const ThemedButton = ({ title, variant = "primary", style, ...props }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.primaryText,
    },
    secondary: {
      backgroundColor: colors.border,
      color: colors.text,
    },
    danger: {
      backgroundColor: colors.error,
      color: "#ffffff",
    },
  };

  const selectedVariant = variants[variant] ?? variants.primary;

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          width: 180,
          paddingVertical: 12,
          borderRadius: 8,
          backgroundColor: selectedVariant.backgroundColor,
          alignItems: "center",
          marginVertical: 6,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      <Text
        style={{
          color: selectedVariant.color,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default ThemedButton;
