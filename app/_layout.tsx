import { Stack } from "expo-router";

// Componente que garante que o conteúdo seja mostrado em uma
// área "segura", ou seja que não seja coberta por algum outro 
// elemento da interface gráfica
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
