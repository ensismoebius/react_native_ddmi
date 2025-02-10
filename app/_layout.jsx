import { Stack } from "expo-router";

// Componente que fornece as informações sobre as áreas seguras
// do dispositivo atual, ou seja, as partes que não são cobertas
// por algum outro elemento da interface gráfica
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout()
{
  return (
    // Envolve os elementos do app para que tenha acesso ao 
    // contexto ligado a esse Provider
    < ThemeProvider >
      <SafeAreaProvider>
        {/* Organiza as telas que forem aparecendo de forma empilhada */}
        <Stack>
          {/* Além de empilhada a tela NÂO tem o cabeçalho */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider >
  );
}
