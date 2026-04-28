import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="consultaCEP" options={{ headerShown: false }} />
        <Stack.Screen name="postGetPhp" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
