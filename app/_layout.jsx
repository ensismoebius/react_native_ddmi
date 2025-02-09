import { Stack } from "expo-router";

// Componente que fornece as informações sobre as áreas seguras
// do dispositivo atual, ou seja, as partes que não são cobertas
// por algum outro elemento da interface gráfica
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout()
{
  return (
    <SafeAreaProvider>
      {/* Organiza as telas que forem aparecendo de forma empilhada */}
      <Stack>

        {/* Alé de empilhada a tela NÂO tem o cabeçalho */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
