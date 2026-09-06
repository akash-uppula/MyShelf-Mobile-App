import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthProvider from "../context/AuthContext";
import BookProvider from "../context/BookContext";

const Layout = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <BookProvider>
          <StatusBar style={isDark ? "light" : "dark"} />

          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </BookProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
