import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="consultaCEP" options={{ headerShown: false }} />
      <Stack.Screen name="postGetPhp" options={{ headerShown: false }} />
    </Stack>
  );
}
